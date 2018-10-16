import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveRequestPutPayload } from '@leave/classes/request';
import withApiLeaveRequestDetail, {
  WithApiLeaveRequestDetailHandler,
} from '@leave/enhancers/request/withApiLeaveRequestDetail';
import withLeaveRequestDetail, {
  WithLeaveRequestDetail,
} from '@leave/enhancers/request/withLeaveRequestDetail';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

interface RouteParams {
  leaveRequestUid: string;
}

interface State {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  leaveRequestUid?: string | undefined;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

type AllProps
  = WithLeaveRequestDetail
  & WithApiLeaveRequestDetailHandler
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams>
  & InjectedIntlProps
  & Handler
  & State
  & Updaters;

interface Handler {
  handleValidate: (payload: LeaveRequestFormData) => FormErrors;
  handleSubmit: (payload: LeaveRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

const registrationEditor: React.SFC<AllProps> = props => {
  const { mode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.leaveRequestDetailState;

  const renderForm = (formData: LeaveRequestFormData) => (
    <RequestFormContainer 
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: LeaveRequestFormData = {
    information: {
      leaveType: undefined,
      regularType: undefined,
      start: undefined,
      end: undefined,
      address: undefined,
      contactNumber: undefined,
      reason: undefined,
    }
  };

   // New
  if (mode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (mode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data

      return renderForm(initialValues);
    }
  }

  return null;
};

const handlerCreators: HandleCreators<AllProps, Handler> = {
  handleValidate: (props: AllProps) => (payload: LeaveRequestFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'leaveType', 'start', 'end',  
      'address', 'contactNumber', 'reason'
    ];
  
    requiredFields.forEach(field => {
      if (!payload.information[field] || isNullOrUndefined(payload.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `leaveRequest.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AllProps) => (payload: LeaveRequestRegistrationFormData) => { 
    const { mode, leaveRequestUid, apiRegistrationDetailPost, apiRegistrationDetailPut } = props;
    const { user } = props.userState;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const putPayload: ILeaveRequestPutPayload = ({
      leaveType: payload.information.leaveType || 'n/a',
      regularType: payload.information.regularType || 'n/a',
      start: payload.information.start || '',
      end: payload.information.end || '',
      address: payload.information.address,
      contactNumber: payload.information.contactNumber,
      reason: payload.information.reason,
    });

    console.log(putPayload);

    if (mode === FormMode.New) {
      return new Promise((resolve, reject) => {
        apiRegistrationDetailPost(leaveRequestUid, putPayload, resolve, reject);
      });
    }

    if (!leaveRequestUid) {
      return Promise.reject('leave uid was not found');
    }

    if (mode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        apiRegistrationDetailPut(leaveRequestUid, putPayload, resolve, reject);
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AllProps) => (result: any, dispatch: Dispatch<any>) => {
    // console.log(result);
    // console.log(dispatch);
    const { alertAdd } = props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Success bro!!!'
    });
  },
  handleSubmitFail: (props: AllProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { alertAdd } = props.layoutDispatch;
    
    if (submitError) {
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AllProps, State> = (props: AllProps): State => ({ 
  mode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, State, Updaters> = {
  stateUpdate: (prevState: State) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, apiRegistrationDetailGet } = this.props;
    const { user } = this.props.userState;
    
    const view = {
      title: 'project.form.newTitle',
      subTitle: 'project.form.newSubTitle',
    };

    if (user) {
      stateUpdate({ 
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'project.form.editTitle';
      view.subTitle = 'project.form.editSubTitle';

      stateUpdate({ 
        mode: FormMode.Edit,
        projectUid: history.location.state.uid
      });

      apiRegistrationDetailGet(history.location.state.uid);
    }

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('LeaveRequestEditor'),
  
  withUser,
  withLayout,
  withAppBar,
  withLeaveRequestDetail,
  withApiLeaveRequestDetail,
  injectIntl,

  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(registrationEditor);