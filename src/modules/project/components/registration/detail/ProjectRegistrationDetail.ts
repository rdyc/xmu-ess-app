import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { ProjectUserAction } from '@project/classes/types';
import { ProjectRegistrationDetailView } from '@project/components/registration/detail/ProjectRegistrationDetailView';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
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

interface Handler {
  handleProjectRefresh: () => void;
  handleProjectModify: () => void;
  handleProjectClose: () => void;
  handleProjectReOpen: () => void;
  handleProjectChangeOwner: () => void;
  handleProjectManageSite: () => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnState {
  action?: ProjectUserAction | undefined;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  projectUid: string;
}

export type ProjectRegistrationDetailProps
  = WithProjectRegistration
  & WithOidc
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<ProjectRegistrationDetailProps, OwnState> = (props: ProjectRegistrationDetailProps): OwnState => ({ 
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  })
};

const handlerCreators: HandleCreators<ProjectRegistrationDetailProps, Handler> = {
  handleProjectRefresh: (props: ProjectRegistrationDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.projectRegisterDispatch;

    if (user) {
      loadDetailRequest({
        projectUid: match.params.projectUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  handleProjectModify: (props: ProjectRegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: ProjectUserAction.Modify,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleProjectClose: (props: ProjectRegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: ProjectUserAction.Close,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.closeTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.closeDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleProjectReOpen: (props: ProjectRegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: ProjectUserAction.ReOpen,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.reOpenTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.reOpenDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'})
    });
  },
  handleProjectChangeOwner: (props: ProjectRegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: ProjectUserAction.ChangeOwner,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.changeOwnerTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.changeOwnerDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleProjectManageSite: (props: ProjectRegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: ProjectUserAction.ManageSites,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.manageSiteTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.manageSiteDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleDialogOpen: (props: ProjectRegistrationDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({ 
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({id: dialogCancelText}),
      dialogConfirmedText: confirmText || intl.formatMessage({id: dialogConfirmedText})
    });
  },
  handleDialogClose: (props: ProjectRegistrationDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: ProjectRegistrationDetailProps) => () => { 
    const { history, action, stateReset } = props;
    const { response } = props.projectRegisterState.detail;

    // skipp untracked action or empty response
    if (!action || !response) {
      return;
    } 

    // define vars
    let companyUid: string | undefined;
    let projectUid: string | undefined;

    // get company uid
    if (response.data && response.data.customer) {
      companyUid = response.data.customer.companyUid;
    }

    // get project uid
    if (response.data) {
      projectUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      ProjectUserAction.Modify, 
      ProjectUserAction.ChangeOwner, 
      ProjectUserAction.Close, 
      ProjectUserAction.ReOpen, 
      ProjectUserAction.ManageSites
    ];

    if (actions.indexOf(action) !== -1) {
      let next: string = '404';

      switch (action) {
        case ProjectUserAction.Modify:
          next = '/project/requests/form';
          break;
          
        case ProjectUserAction.ChangeOwner:
          next = '/project/requests/owner';
          break;
        
        case ProjectUserAction.Close:
        case ProjectUserAction.ReOpen:
          next = '/project/requests/status';
          break;

        case ProjectUserAction.ManageSites:
          next = `/project/requests/sites/${companyUid}/${projectUid}`;
          break;

        default:
          break;
      }

      stateReset();

      history.push(next, { 
        uid: projectUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectRegistrationDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleProjectRefresh, handleProjectModify, 
      handleProjectClose, handleProjectReOpen,
      handleProjectChangeOwner, handleProjectManageSite,
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.detail.title'}),
      subTitle : intl.formatMessage({id: 'project.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ProjectUserAction.Refresh:
          handleProjectRefresh();
          break;
        
        case ProjectUserAction.Modify:
          handleProjectModify();
          break;
  
        case ProjectUserAction.Close:
          handleProjectClose();
          break;
        
        case ProjectUserAction.ReOpen:
          handleProjectReOpen();
          break;
  
        case ProjectUserAction.ChangeOwner:
          handleProjectChangeOwner();
          break;
  
        case ProjectUserAction.ManageSites:
          handleProjectManageSite();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        projectUid: match.params.projectUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: ProjectRegistrationDetailProps) {
    if (nextProps.projectRegisterState.detail.response !== this.props.projectRegisterState.detail.response) {
      const { intl } = nextProps;
      const { user } = nextProps.oidcState;
      const { response } = nextProps.projectRegisterState.detail;
      const { assignMenus } = nextProps.appBarDispatch;
      
      const isStatusTypeEquals = (statusTypes: string[]): boolean => {
        let result = false;

        if (response && response.data) {
          result = statusTypes.indexOf(response.data.statusType) !== -1;
        }

        return result;
      };

      const fnIsAdmin = (): boolean => {
        let result: boolean = false;

        if (user) {
          const role: string | string[] | undefined = user.profile.role;

          if (role) {
            if (Array.isArray(role)) {
              result = role.indexOf(AppRole.Admin) !== -1;
            } else {
              result = role === AppRole.Admin;
            }
          }
        }

        return result;
      };

      const isAdmin = fnIsAdmin();

      const currentMenus = [
        {
          id: ProjectUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: ProjectUserAction.Modify,
          name: intl.formatMessage({id: 'project.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([
            WorkflowStatusType.Submitted, 
            WorkflowStatusType.InProgress, 
            WorkflowStatusType.Approved
          ])
        },
        {
          id: ProjectUserAction.Close,
          name: intl.formatMessage({id: 'project.action.close'}),
          enabled: true,
          visible: isStatusTypeEquals([
            WorkflowStatusType.Approved, 
            WorkflowStatusType.ReOpened
          ])
        },
        {
          id: ProjectUserAction.ReOpen,
          name: intl.formatMessage({id: 'project.action.reOpen'}),
          enabled: true,
          visible: isStatusTypeEquals([
            WorkflowStatusType.Closed
          ])
        },
        {
          id: ProjectUserAction.ChangeOwner,
          name: intl.formatMessage({id: 'project.action.owner'}),
          enabled: true,
          visible: isStatusTypeEquals([
            WorkflowStatusType.Approved,
          ])
        },
        {
          id: ProjectUserAction.ManageSites,
          name: intl.formatMessage({id: 'project.action.site'}),
          enabled: true,
          visible: isStatusTypeEquals([
            WorkflowStatusType.Approved,
          ]) && isAdmin
        }
      ];

      assignMenus(currentMenus);
    }
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

export const ProjectRegistrationDetail = compose<ProjectRegistrationDetailProps, {}>(
  withOidc,
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<ProjectRegistrationDetailProps, Handler>(handlerCreators),
  lifecycle<ProjectRegistrationDetailProps, OwnState>(lifecycles),
)(ProjectRegistrationDetailView);