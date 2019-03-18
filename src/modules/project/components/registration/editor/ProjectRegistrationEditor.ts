import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import {
  IProjectRegistrationPatchPayload,
  IProjectRegistrationPostPayload,
  IProjectRegistrationPutPayload,
  IProjectRegistrationPutSales,
} from '@project/classes/request/registration';
import { IProject } from '@project/classes/response';
import {
  ProjectDocumentFormData,
  ProjectRegistrationFormData,
} from '@project/components/registration/editor/forms/ProjectRegistrationContainerForm';
import { ProjectRegistrationEditorView } from '@project/components/registration/editor/ProjectRegistrationEditorView';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
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

interface IOwnHandlers {
  handleValidate: (payload: ProjectRegistrationFormData) => FormErrors;
  handleSubmit: (payload: ProjectRegistrationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {
  projectUid: string;
}

interface IOwnState {
  formMode: FormMode;
  companyUid?: string;
  positionUid?: string;
  projectUid?: string;
  isRequestor: boolean;
  isAdmin: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type ProjectRegistrationEditorProps
  = WithProjectRegistration
  & WithOidc
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<ProjectRegistrationEditorProps, IOwnState> = (props: ProjectRegistrationEditorProps): IOwnState => ({ 
  formMode: FormMode.New,
  isRequestor: true,
  isAdmin: false
});

const handlerCreators: HandleCreators<ProjectRegistrationEditorProps, IOwnHandlers> = {
  handleValidate: (props: ProjectRegistrationEditorProps) => (formData: ProjectRegistrationFormData) => { 
    const errors = {
      information: {},
      sales: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectType', 'name',  
      'start', 'end', 'currencyType', 'valueUsd'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(projectMessage.registration.fieldFor(field, 'fieldRequired'));
      }
    });

    // sales must be have values
    // if (formData.sales.employees.length === 0) {
    //   errors.sales = props.intl.formatMessage(projectMessage.registration.fieldFor('sales', 'fieldRequired'));
    // }
    
    return errors;
  },
  handleSubmit: (props: ProjectRegistrationEditorProps) => (formData: ProjectRegistrationFormData) => { 
    const { formMode, projectUid, isRequestor, intl } = props;
    const { user } = props.userState;
    const { response } = props.projectRegisterState.detail;
    const { createRequest, updateRequest, patchRequest } = props.projectRegisterDispatch;
    
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

      const documents: any[] = [];
      const fillDocuments = (item: ProjectDocumentFormData) => {
        // read documentType from 'Indexable Types'
        const documentType = Object.keys(item)[0];
        
        let uid: string | null = null;

        // find existing uid
        if (response && response.data) {
          // merge all documents
          const source = [ 
            ...response.data.documents,
            ...response.data.documentPreSales
          ];

          // find same doc type
          const document = source.find(doc => doc.documentType === documentType);

          // replace doc uid
          if (!isNullOrUndefined(document)) {
            uid = document.uid;
          }
        }
        
        // fill document
        documents.push({
          uid,
          documentType,
          isChecked: item[documentType]
        });
      };
  
      if (formData.information.projectType === ProjectType.PreSales) {
        formData.document.preSales.forEach(fillDocuments);
      } else {
        formData.document.project.forEach(fillDocuments);
      }
      return documents;
    };

    const parsedSales = (): IProjectRegistrationPutSales[] | undefined => {
      if (!formData.sales) {
        return undefined;
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

    // checking sales must be have values
    const sales = parsedSales();

    if (!sales || sales.length === 0) {
      return Promise.reject(props.intl.formatMessage(projectMessage.registration.message.undefinedSales));
    }

    const payload = {
      ...formData.information,
      sales,
      documents: parsedDocuments()
    };

    // creating
    if (formMode === FormMode.New) {
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

    // update checking
    if (!projectUid) {
      const message = intl.formatMessage(projectMessage.registration.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      // requestor updating the request
      if (isRequestor) {
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
      // tslint:disable-next-line:no-else-after-return
      } else {
        // owner patching the request
        return new Promise((resolve, reject) => {
          patchRequest({
            projectUid, 
            resolve, 
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload as IProjectRegistrationPatchPayload, 
          });
        });
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: ProjectRegistrationEditorProps) => (response: IProject) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(projectMessage.registration.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectMessage.registration.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/project/requests/${response.uid}`);
  },
  handleSubmitFail: (props: ProjectRegistrationEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(projectMessage.registration.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(projectMessage.registration.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<ProjectRegistrationEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: projectMessage.registration.page.newTitle,
      subTitle: projectMessage.registration.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    // checking admin status
    const { user: oidc } = this.props.oidcState;
    let result: boolean = false;
    if (oidc) {
      const role: string | string[] | undefined = oidc.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        stateUpdate({ 
          isAdmin: true
        });
      }
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = projectMessage.registration.page.modifyTitle;
      view.subTitle = projectMessage.registration.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        projectUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: history.location.state.uid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: '/project/requests',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentDidUpdate(prevProps: ProjectRegistrationEditorProps) {
    if (this.props.formMode === FormMode.Edit && prevProps.projectRegisterState.detail !== this.props.projectRegisterState.detail) {
      const { response } = this.props.projectRegisterState.detail;

      if (this.props.userState.user && response && response.data && response.data.changes) {
        if (this.props.userState.user.uid !== response.data.changes.createdBy) {
          this.props.stateUpdate({
            isRequestor: false
          });
        }
      }
    }
  },
  componentWillUnmount() {
    const { projectRegisterDispatch, masterPage } = this.props;
    
    masterPage.resetPage();

    projectRegisterDispatch.createDispose();
    projectRegisterDispatch.updateDispose();
  }
};

export const ProjectRegistrationEditor = compose<ProjectRegistrationEditorProps, {}>(
  setDisplayName('ProjectRegistrationEditor'),
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withProjectRegistration,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectRegistrationEditorView);