import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectRegistrationPostPayload, IProjectRegistrationPutDocument, IProjectRegistrationPutPayload, IProjectRegistrationPutSales } from '@project/classes/request/registration';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationFormData } from '@project/components/registration/editor/forms/RegistrationForm';
import { RegistrationEditorView } from '@project/components/registration/editor/RegistrationEditorView';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectRegistrationMessage } from '@project/locales/messages/projectRegistrationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

interface OwnHandlers {
  handleValidate: (payload: ProjectRegistrationFormData) => FormErrors;
  handleSubmit: (payload: ProjectRegistrationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  projectUid: string;
}

interface OwnState {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type RegistrationEditorProps
  = WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<RegistrationEditorProps, OwnHandlers> = {
  handleValidate: (props: RegistrationEditorProps) => (formData: ProjectRegistrationFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectType', 'name',  
      'start', 'end', 'currencyType', 'valueUsd'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `project.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: RegistrationEditorProps) => (formData: ProjectRegistrationFormData) => { 
    const { mode, projectUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.projectRegisterDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedDocuments = () => {
      if (
        formData.information.projectType === ProjectType.ExtraMiles || 
        formData.information.projectType === ProjectType.NonProject
      ) {
        return null;
      }

      const _documents: IProjectRegistrationPutDocument[] = [];
  
      if (formData.information.projectType === ProjectType.Project) {
        formData.document.project.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isChecked
          })
        );
      }
      
      if (formData.information.projectType === ProjectType.PreSales) {
        formData.document.preSales.forEach(item => 
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
      if (!formData.sales) {
        return null;
      }
  
      const _sales: IProjectRegistrationPutSales[] = [];
  
      formData.sales.employees.forEach(item => 
        _sales.push({
          uid: item.uid,
          employeeUid: item.employeeUid
        })
      );
      
      return _sales;
    };

    const payload = {
      ...formData.information,
      documents: parsedDocuments(),
      sales: parsedSales()
    };

    if (mode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IProjectRegistrationPostPayload
        });
      });
    }

    if (!projectUid) {
      return Promise.reject('project uid was not found');
    }

    if (mode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          projectUid, 
          resolve, 
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IProjectRegistrationPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: RegistrationEditorProps) => (response: IProject) => {
    const { mode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (mode === FormMode.New) {
      message = intl.formatMessage(projectRegistrationMessage.createSuccess, { uid: response.uid });
    }

    if (mode === FormMode.Edit) {
      message = intl.formatMessage(projectRegistrationMessage.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/project/list');
  },
  handleSubmitFail: (props: RegistrationEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { mode, intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (mode === FormMode.New) {
        message = intl.formatMessage(projectRegistrationMessage.createFailure);
      }

      if (mode === FormMode.Edit) {
        message = intl.formatMessage(projectRegistrationMessage.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<RegistrationEditorProps, OwnState> = (props: RegistrationEditorProps): OwnState => ({ 
  mode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<RegistrationEditorProps, {}> = {
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
    const { layoutDispatch, appBarDispatch, projectRegisterDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    projectRegisterDispatch.createDispose();
    projectRegisterDispatch.updateDispose();
  }
};

export default compose<RegistrationEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RegistrationEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<RegistrationEditorProps, {}>(lifecycles),
)(RegistrationEditorView);