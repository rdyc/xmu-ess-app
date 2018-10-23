import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectSitePayload } from '@project/classes/request/site';
import { IProjectSite } from '@project/classes/response';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectSite, withProjectSite } from '@project/hoc/withProjectSite';
import { projectOwnerMessage } from '@project/locales/messages/projectOwnerMessage';
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

import { ProjectSiteFormData } from './forms/SiteContainerForm';
import { SiteEditorView } from './SiteEditorView';

interface OwnHandlers {
  handleNew: () => void;
  handleEdit: (site: IProjectSite) => void;
  handleCancel: () => void;
  handleValidate: (payload: ProjectSiteFormData) => FormErrors;
  handleSubmit: (payload: ProjectSiteFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  companyUid: string;
  projectUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  projectUid?: string | undefined;
  siteUid?: string | undefined;
  isOpen: boolean;
  editAction?: 'update' | 'delete' | undefined;
  initialValues?: ProjectSiteFormData;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type SiteEditorProps
  = WithProjectSite
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<SiteEditorProps, OwnState> = (props: SiteEditorProps): OwnState => {
  const { match, location } = props;
  
  return { 
    formMode: location.state.siteUid ? FormMode.Edit : FormMode.New,
    companyUid: match.params.companyUid,
    projectUid: match.params.projectUid,
    siteUid: location.state.siteUid,
    editAction: 'update',
    isOpen: false
  };
};

const handlerCreators: HandleCreators<SiteEditorProps, OwnHandlers> = {
  handleNew: (props: SiteEditorProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpen: true,
      siteUid: undefined,
      initialValues: {
        information: {
          name: '',
          siteType: '',
          value: '',
        }
      }
    });
  },
  handleEdit: (props: SiteEditorProps) => (site: IProjectSite) => { 
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpen: true,
      siteUid: site.uid,
      initialValues: {
        information: {
          name: site.name,
          siteType: site.siteType,
          value: site.value,
        }
      }
    });
  },
  handleCancel: (props: SiteEditorProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpen: false
    });
  },
  handleValidate: (props: SiteEditorProps) => (formData: ProjectSiteFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['name', 'siteType', 'value'];
  
    requiredFields.forEach(field => {
      if (isNullOrUndefined(formData.information)) {
        return;
      }

      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `project.site.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: SiteEditorProps) => (formData: ProjectSiteFormData) => { 
    const { formMode, companyUid, projectUid, siteUid, editAction, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.projectSiteDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!projectUid || !companyUid) {
      const message = intl.formatMessage(projectOwnerMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload = { ...information };

    // generate request
    const request = {
      companyUid,
      projectUid, 
      data: payload as IProjectSitePayload
    };

    // create
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({ 
          ...request,
          reject,
          resolve
        });
      });
    } 

    // update or delete
    if (formMode === FormMode.Edit) {
      if (siteUid) {
        // updating
        if (editAction === 'update') {
          return new Promise((resolve, reject) => {
            updateRequest({
              ...request,
              siteUid,
              reject,
              resolve
            });
          });
        }

        // deleting
        if (editAction === 'delete') {
          return new Promise((resolve, reject) => {
            deleteRequest({
              ...request,
              siteUid,
              reject,
              resolve
            });
          });
        }
      }
    }

    return Promise.reject('nothing to do');
  },
  handleSubmitSuccess: (props: SiteEditorProps) => (response: boolean) => {
    const { formMode, intl, stateUpdate, match } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadRequest } = props.projectSiteDispatch;

    let message: string = intl.formatMessage(projectOwnerMessage.updateSuccess);

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectOwnerMessage.updateSuccess);
    }

    stateUpdate({
      isOpen: false
    });

    alertAdd({
      message,
      time: new Date()
    });

    loadRequest({
      companyUid: match.params.companyUid,
      projectUid: match.params.projectUid
    });
  },
  handleSubmitFail: (props: SiteEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(projectOwnerMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<SiteEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, match, history } = this.props;
    const { user } = this.props.userState;
    const { response } = this.props.projectRegisterState.detail;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;
    const { loadRequest } = this.props.projectSiteDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.form.site.editTitle'}),
      subTitle : intl.formatMessage({id: 'project.form.site.editSubTitle'})
    });
    
    layoutDispatch.navBackShow(); 

    if (!isNullOrUndefined(history.location.state) && !response && user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: match.params.projectUid
      });

      loadRequest({
        companyUid: match.params.companyUid,
        projectUid: match.params.projectUid
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, projectSiteDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    projectSiteDispatch.createDispose();
    projectSiteDispatch.updateDispose();
    projectSiteDispatch.deleteDispose();
  }
};

export const SiteEditor = compose<SiteEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  withProjectSite,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SiteEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<SiteEditorProps, {}>(lifecycles),
)(SiteEditorView);