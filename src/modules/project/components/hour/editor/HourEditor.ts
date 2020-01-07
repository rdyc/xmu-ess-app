import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectHourPutPayload } from '@project/classes/request/hour';
import { WithProjectHour, withProjectHour } from '@project/hoc/withProjectHour';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectHourMessage } from '@project/locales/messages/projectHourMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
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

import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ProjectHourFormData } from './forms/HourForm';
import { HourEditorView } from './HourEditorView';

interface IOwnHandlers {
  handleValidate: (payload: ProjectHourFormData) => FormErrors;
  handleSubmit: (payload: ProjectHourFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {

}

interface IOwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type HourEditorProps
  = WithProjectHour
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const handlerCreators: HandleCreators<HourEditorProps, IOwnHandlers> = {
  handleValidate: (props: HourEditorProps) => (formData: ProjectHourFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['hours'];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(projectMessage.registration.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: HourEditorProps) => (formData: ProjectHourFormData) => { 
    const { projectUid, intl } = props;
    const { user } = props.userState;
    const { updateRequest } = props.projectHourDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!projectUid || !information.hours) {
      const message = intl.formatMessage(projectHourMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: IProjectHourPutPayload = {
      hours: information.hours
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      updateRequest({
        projectUid, 
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: HourEditorProps) => (response: boolean) => {
    const { formMode, intl, history, projectUid } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectHourMessage.updateSuccess);
    }

    alertAdd({
      message,
      time: new Date()
    });

    // back to project detail
    if (projectUid) {
      history.push(`/project/requests/${projectUid}`);
    } else {
      history.push('/project/requests');
    }
  },
  handleSubmitFail: (props: HourEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(projectHourMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<HourEditorProps, IOwnState> = (props: HourEditorProps): IOwnState => {
  const { history } = props;
  
  return { 
    formMode: FormMode.Edit,
    projectUid: history.location.state.uid
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<HourEditorProps, {}> = {
  componentDidMount() {
    const { intl, history } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;

    if (!isNullOrUndefined(history.location.state) && user) {
      this.props.masterPage.changePage({
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        parentUrl: `/project/requests/${history.location.state.uid}`,
        title: intl.formatMessage(projectMessage.registration.page.hourModifyTitle),
        description : intl.formatMessage(projectMessage.registration.page.hourModifySubHeader)
      });
      
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: history.location.state.uid
      });
    }
  },
  componentWillUnmount() {
    const { projectHourDispatch } = this.props;

    projectHourDispatch.updateDispose();
  }
};

export const HourEditor = compose<HourEditorProps, {}>(
  setDisplayName('HourEditor'),
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withProjectRegistration,
  withProjectHour,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(HourEditorView);