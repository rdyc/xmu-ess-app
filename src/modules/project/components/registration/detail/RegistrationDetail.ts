import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { ProjectUserAction } from '@project/classes/types';
import { RegistrationDetailView } from '@project/components/registration/detail/RegistrationDetailView';
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

export type RegistrationDetailProps
  = WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<RegistrationDetailProps, OwnState> = (props: RegistrationDetailProps): OwnState => ({ 
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

const handlerCreators: HandleCreators<RegistrationDetailProps, Handler> = {
  handleProjectRefresh: (props: RegistrationDetailProps) => () => { 
    const { match } = props;

    props.apiRegistrationDetailGet(match.params.projectUid);
  },
  handleProjectModify: (props: RegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleProjectClose: (props: RegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.closeTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.closeDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleProjectReOpen: (props: RegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.reOpenTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.reOpenDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'})
    });
  },
  handleProjectChangeOwner: (props: RegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.changeOwnerTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.changeOwnerDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleProjectManageSite: (props: RegistrationDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.manageSiteTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.manageSiteDescription'})
    });
  },
  handleDialogOpen: (props: RegistrationDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
  handleDialogClose: (props: RegistrationDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: RegistrationDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const projectUid = match.params.projectUid;

    stateReset();

    history.push('/project/form/', { uid: projectUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<RegistrationDetailProps, OwnState> = {
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
  componentWillReceiveProps(nextProps: RegistrationDetailProps) {
    if (nextProps.projectRegisterState.detail.response !== this.props.projectRegisterState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.projectRegisterState.detail;
      const { assignMenus } = nextProps.appBarDispatch;
      
      const isStatusTypeEquals = (statusTypes: string[]): boolean => {
        let result = false;

        if (response && response.data) {
          result = statusTypes.indexOf(response.data.statusType) !== -1;
        }

        return result;
      };

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
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
        },
        {
          id: ProjectUserAction.Close,
          name: intl.formatMessage({id: 'project.action.close'}),
          enabled: true,
          visible: isStatusTypeEquals([WorkflowStatusType.Approved, WorkflowStatusType.ReOpened])
        },
        {
          id: ProjectUserAction.ReOpen,
          name: intl.formatMessage({id: 'project.action.reOpen'}),
          enabled: true,
          visible: isStatusTypeEquals([WorkflowStatusType.Closed])
        },
        {
          id: ProjectUserAction.ChangeOwner,
          name: intl.formatMessage({id: 'project.action.changeOwner'}),
          enabled: true,
          visible: isStatusTypeEquals([WorkflowStatusType.Approved])
        },
        {
          id: ProjectUserAction.ManageSites,
          name: intl.formatMessage({id: 'project.action.manageSite'}),
          enabled: true,
          visible: false
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, projectRegisterDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    projectRegisterDispatch.loadDetailDispose();
  }
};

export const RegistrationDetail = compose<RegistrationDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<RegistrationDetailProps, Handler>(handlerCreators),
  lifecycle<RegistrationDetailProps, OwnState>(lifecycles),
)(RegistrationDetailView);