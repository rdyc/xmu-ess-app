import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { Typography } from '@material-ui/core';
import { IProjectPutDocument, IProjectPutPayload, IProjectPutSales } from '@project/classes/request';
import {
  ProjectRegistrationFormData,
  RegistrationFormContainer,
} from '@project/components/registration/forms/RegistrationFormContainer';
import withApiProjectRegistrationDetail, {
  WithApiProjectRegistrationDetailHandler,
} from '@project/enhancers/registration/withApiProjectRegistrationDetail';
import withProjectRegistrationDetail, {
  WithProjectRegistrationDetail,
} from '@project/enhancers/registration/withProjectRegistrationDetail';
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
  projectUid: string;
}

interface State {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

type AllProps
  = WithProjectRegistrationDetail
  & WithApiProjectRegistrationDetailHandler
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams>
  & InjectedIntlProps
  & Handler
  & State
  & Updaters;

interface Handler {
  handleValidate: (payload: ProjectRegistrationFormData) => FormErrors;
  handleSubmit: (payload: ProjectRegistrationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

const registrationEditor: React.SFC<AllProps> = props => {
  const { mode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectDetailState;

  const renderForm = (formData: ProjectRegistrationFormData) => (
    <RegistrationFormContainer 
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ProjectRegistrationFormData = {
    information: {
      customerUid: undefined,
      projectType: undefined,
      contractNumber: undefined,
      name: undefined,
      description: 'desc',
      start: undefined,
      end: undefined,
      currencyType: undefined,
      rate: 1,
      valueUsd: 0,
      valueIdr: 0,
    },
    document: {
      project: [],
      preSales: [],
    },
    sales: {
      employees: []
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
  handleValidate: (props: AllProps) => (payload: ProjectRegistrationFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectType', 'name',  
      'start', 'end', 'currencyType', 'valueUsd'
    ];
  
    requiredFields.forEach(field => {
      if (!payload.information[field] || isNullOrUndefined(payload.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `project.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AllProps) => (payload: ProjectRegistrationFormData) => { 
    const { mode, projectUid, apiRegistrationDetailPost, apiRegistrationDetailPut } = props;
    const { user } = props.userState;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedDocuments = () => {
      if (
        payload.information.projectType === ProjectType.ExtraMiles || 
        payload.information.projectType === ProjectType.NonProject
      ) {
        return null;
      }

      const _documents: IProjectPutDocument[] = [];
  
      if (payload.information.projectType === ProjectType.Project) {
        payload.document.project.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isChecked
          })
        );
      }
      
      if (payload.information.projectType === ProjectType.PreSales) {
        payload.document.preSales.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isChecked
          })
        );
      }
      
      return _documents;
    };

    const parsedSales = () => {
      if (!payload.sales) {
        return null;
      }
  
      const _sales: IProjectPutSales[] = [];
  
      payload.sales.employees.forEach(item => 
        _sales.push({
          uid: item.uid,
          employeeUid: item.employeeUid
        })
      );
      
      return _sales;
    };

    const putPayload: IProjectPutPayload = ({
      customerUid: payload.information.customerUid || 'n/a',
      projectType: payload.information.projectType || 'n/a',
      currencyType: payload.information.currencyType || 'n/a',
      contractNumber: payload.information.contractNumber,
      name: payload.information.name || 'n/a',
      description: payload.information.description,
      start: payload.information.start || '',
      end: payload.information.end || '',
      rate: payload.information.rate,
      valueUsd: payload.information.valueUsd,
      valueIdr: payload.information.valueIdr,
      documents: parsedDocuments(),
      sales: parsedSales()
    });

    console.log(putPayload);

    if (mode === FormMode.New) {
      return new Promise((resolve, reject) => {
        apiRegistrationDetailPost(projectUid, putPayload, resolve, reject);
      });
    }

    if (!projectUid) {
      return Promise.reject('project uid was not found');
    }

    if (mode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        apiRegistrationDetailPut(projectUid, putPayload, resolve, reject);
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
  setDisplayName('ProjectRegistrationEditor'),
  
  withUser,
  withLayout,
  withAppBar,
  withProjectRegistrationDetail,
  withApiProjectRegistrationDetail,
  injectIntl,

  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(registrationEditor);