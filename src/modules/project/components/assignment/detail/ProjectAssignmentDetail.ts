import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { projectMessage } from '@project/locales/messages/projectMessage';
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

import { ProjectAssignmentDetailView } from './ProjectAssignmentDetailView';

interface Handler {
  handleAssignmentRefresh: () => void;
  handleAssignmentModify: () => void;
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
  assignmentUid: string;
}

export type ProjectAssignmentDetailProps
  = WithProjectAssignment
  & WithOidc
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<ProjectAssignmentDetailProps, OwnState> = (props: ProjectAssignmentDetailProps): OwnState => ({ 
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

const handlerCreators: HandleCreators<ProjectAssignmentDetailProps, Handler> = {
  handleAssignmentRefresh: (props: ProjectAssignmentDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.projectAssignmentDispatch;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        assignmentUid: match.params.assignmentUid,
      });
    }
  },
  handleAssignmentModify: (props: ProjectAssignmentDetailProps) => () => { 
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
  handleDialogOpen: (props: ProjectAssignmentDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
  handleDialogClose: (props: ProjectAssignmentDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: ProjectAssignmentDetailProps) => () => { 
    const { history, action, stateReset } = props;
    const { response } = props.projectAssignmentState.detail;

    // skipp untracked action or empty response
    if (!action || !response) {
      return;
    } 

    // define vars
    let companyUid: string | undefined;
    let projectUid: string | undefined;
    let assignmentUid: string | undefined;

    // get company uid
    if (response.data && response.data.customer) {
      companyUid = response.data.customer.companyUid;
    }

    // get project & assignment uid
    if (response.data) {
      assignmentUid = response.data.uid;
      projectUid = response.data.projectUid;
    }

    // actions with new page
    const actions = [
      ProjectUserAction.Modify
    ];

    if (actions.indexOf(action) !== -1) {
      let next: string = '404';

      switch (action) {
        case ProjectUserAction.Modify:
          next = '/project/assignments/form';
          break;

        default:
          break;
      }

      stateReset();

      history.push(next, {
        companyUid,
        assignmentUid, 
        projectUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleAssignmentRefresh, handleAssignmentModify
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectAssignmentDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage(projectMessage.assignment.page.detailTitle),
      subTitle : intl.formatMessage(projectMessage.assignment.page.detailSubHeader)
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ProjectUserAction.Refresh:
          handleAssignmentRefresh();
          break;
        
        case ProjectUserAction.Modify:
          handleAssignmentModify();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        assignmentUid: match.params.assignmentUid,
      });
    }
  },
  componentWillReceiveProps(nextProps: ProjectAssignmentDetailProps) {
    if (nextProps.projectAssignmentState.detail.response !== this.props.projectAssignmentState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;
      
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
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, projectAssignmentDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    projectAssignmentDispatch.loadDetailDispose();
  }
};

export const ProjectAssignmentDetail = compose<ProjectAssignmentDetailProps, {}>(
  withOidc,
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectAssignment,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<ProjectAssignmentDetailProps, Handler>(handlerCreators),
  lifecycle<ProjectAssignmentDetailProps, OwnState>(lifecycles),
)(ProjectAssignmentDetailView);