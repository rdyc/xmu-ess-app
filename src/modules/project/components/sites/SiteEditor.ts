import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { IProjectSitePayload } from '@project/classes/request/site';
import { IProjectSite } from '@project/classes/response';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectSite, withProjectSite } from '@project/hoc/withProjectSite';
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

interface OwnHandlers {
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

interface OwnRouteParams {
  companyUid: string;
  projectUid: string;
}

interface OwnState {
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

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type SiteEditorProps
  = WithProjectSite
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & WithWidth
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<SiteEditorProps, OwnState> = (props: SiteEditorProps): OwnState => {
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

const handlerCreators: HandleCreators<SiteEditorProps, OwnHandlers> = {
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
    const { formMode, editAction, intl, stateUpdate, match } = props;
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
      title: intl.formatMessage({id: 'project.page.siteTitle'}),
      subTitle : intl.formatMessage({id: 'project.page.siteSubTitle'})
    });
    
    layoutDispatch.navBackShow(); 

    if (!isNullOrUndefined(history.location.state) && !response && user) {
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
  withWidth(),
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SiteEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<SiteEditorProps, {}>(lifecycles),
)(SiteEditorView);