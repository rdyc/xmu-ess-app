import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveApprovalDetailView } from '@leave/components/approval/detail/LeaveApprovalDetailView';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
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
  handleLeaveRefresh: () => void;
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
  leaveUid: string;
}

export type ApprovalDetailProps
  = WithLeaveApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<ApprovalDetailProps, OwnState> = (props: ApprovalDetailProps): OwnState => ({ 
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

const handlerCreators: HandleCreators<ApprovalDetailProps, Handler> = {
  handleLeaveRefresh: (props: ApprovalDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailApproval } = props.leaveApprovalDispatch;

    if (user) {
      loadDetailApproval({
        leaveUid: match.params.leaveUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  
  handleDialogOpen: (props: ApprovalDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
  handleDialogClose: (props: ApprovalDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: ApprovalDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const leaveUid = match.params.leaveUid;

    stateReset();

    history.push('approval/leave/form/', { uid: leaveUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<ApprovalDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleLeaveRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailApproval } = this.props.leaveApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.LeaveApproval,
      parentUid: AppMenu.Leave,
      title: intl.formatMessage({id: 'leave.approval.detail.title'}),
      subTitle : intl.formatMessage({id: 'leave.approval.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case LeaveRequestUserAction.Refresh:
          handleLeaveRefresh();
          break;
      
        default:
          break;
      }
    };
    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailApproval({
        leaveUid: match.params.leaveUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: ApprovalDetailProps) {
    if (nextProps.leaveApprovalState.detail.response !== this.props.leaveApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: LeaveRequestUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, leaveApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    leaveApprovalDispatch.loadDetailDispose();
  }
};

export const LeaveApprovalDetail = compose<ApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLeaveApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<ApprovalDetailProps, Handler>(handlerCreators),
  lifecycle<ApprovalDetailProps, OwnState>(lifecycles),
)(LeaveApprovalDetailView);
