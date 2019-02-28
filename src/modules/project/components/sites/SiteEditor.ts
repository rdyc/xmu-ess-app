import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { IProjectSitePayload } from '@project/classes/request/site';
import { IProjectSite } from '@project/classes/response';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectSite, withProjectSite } from '@project/hoc/withProjectSite';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectOwnerMessage } from '@project/locales/messages/projectOwnerMessage';
import { projectSiteMessage } from '@project/locales/messages/projectSiteMessage';
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

import { ProjectSiteFormData } from './forms/SiteContainerForm';
import { SiteEditorView } from './SiteEditorView';

type EditAction = 'update' | 'delete';

interface IOwnHandlers {
  handleMenuOpen: (site: IProjectSite, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (editAction: EditAction) => void;
  handleValidate: (payload: ProjectSiteFormData) => FormErrors;
  handleSubmit: (payload: ProjectSiteFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {
  companyUid: string;
  projectUid: string;
}

interface IOwnState {
  formMode?: FormMode | undefined;
  companyUid?: string | undefined;
  projectUid?: string | undefined;
  siteUid?: string | undefined;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  editAction?: EditAction | undefined;
  initialValues?: ProjectSiteFormData;
  siteItemIndex?: string | undefined;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type SiteEditorProps
  = WithProjectSite
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithMasterPage
  & WithWidth
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<SiteEditorProps, IOwnState> = (props: SiteEditorProps): IOwnState => {
  const { match, location } = props;
  
  return { 
    companyUid: match.params.companyUid,
    projectUid: match.params.projectUid,
    siteUid: location.state.siteUid,
    editAction: undefined,
    isOpenDialog: false,
    isOpenMenu: false
  };
};

const handlerCreators: HandleCreators<SiteEditorProps, IOwnHandlers> = {
  handleMenuOpen: (props: SiteEditorProps) => (site: IProjectSite, index: number) => { 
    const { stateUpdate } = props;

    stateUpdate({
      siteUid: site.uid,
      isOpenMenu: true,
      siteItemIndex: index,
      initialValues: {
        information: {
          name: site.name,
          siteType: site.siteType,
          value: site.value,
        }
      }
    });
  },
  handleMenuClose: (props: SiteEditorProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      siteUid: undefined,
      isOpenMenu: false,
      siteItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: SiteEditorProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: SiteEditorProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: undefined,
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
  handleEdit: (props: SiteEditorProps) => (action: EditAction) => { 
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: action
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
        errors.information[field] = props.intl.formatMessage(projectMessage.site.fieldFor(field, 'fieldRequired'));
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
    const { formMode, editAction, intl, stateUpdate, projectUid, companyUid } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadRequest } = props.projectSiteDispatch;

    let message: string = intl.formatMessage(projectSiteMessage.createSuccess);

    if (formMode === FormMode.Edit) {
      if (editAction && editAction === 'update') {
        message = intl.formatMessage(projectSiteMessage.updateSuccess);
      } else {
        message = intl.formatMessage(projectSiteMessage.deleteSuccess);
      }
    }

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });

    alertAdd({
      message,
      time: new Date()
    });

    if (projectUid && companyUid) {
      loadRequest({
        companyUid,
        projectUid
      });
    }
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

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<SiteEditorProps, {}> = {
  componentDidMount() {
    const { intl, match } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;
    const { loadRequest } = this.props.projectSiteDispatch;

    if (user && match.params.projectUid) {
      // set page
      this.props.masterPage.changePage({
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        parentUrl: `/project/requests/${match.params.projectUid}`,
        title: intl.formatMessage(projectMessage.site.page.modifyTitle),
        description : intl.formatMessage(projectMessage.site.page.modifyTitle)
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: match.params.projectUid
      });
    }

    // load site
    loadRequest({
      companyUid: match.params.companyUid,
      projectUid: match.params.projectUid
    });
  },
  componentWillUnmount() {
    const { projectSiteDispatch } = this.props;

    projectSiteDispatch.createDispose();
    projectSiteDispatch.updateDispose();
    projectSiteDispatch.deleteDispose();
  }
};

export const SiteEditor = compose<SiteEditorProps, {}>(
  setDisplayName('SiteEditor'),
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withProjectRegistration,
  withProjectSite,
  withWidth(),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(SiteEditorView);