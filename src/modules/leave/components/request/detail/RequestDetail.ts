import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { RequestDetailView } from '@leave/components/request/detail/RequestDetailView';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
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
  handleLeaveModify: () => void;
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

export type RequestDetailProps
  = WithLeaveRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<RequestDetailProps, OwnState> = (props: RequestDetailProps): OwnState => ({ 
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

const handlerCreators: HandleCreators<RequestDetailProps, Handler> = {
  handleLeaveRefresh: (props: RequestDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.leaveRequestDispatch;

    if (user) {
      loadDetailRequest({
        leaveUid: match.params.leaveUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  handleLeaveModify: (props: RequestDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'leave.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'leave.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleDialogOpen: (props: RequestDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
  handleDialogClose: (props: RequestDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: RequestDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const leaveUid = match.params.leaveUid;

    stateReset();

    history.push('/leave/form/', { uid: leaveUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<RequestDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleLeaveRefresh, handleLeaveModify
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.leaveRequestDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.LeaveRequest,
      parentUid: AppMenu.Leave,
      title: intl.formatMessage({id: 'leave.detail.title'}),
      subTitle : intl.formatMessage({id: 'leave.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case LeaveRequestUserAction.Refresh:
          handleLeaveRefresh();
          break;
        
        case LeaveRequestUserAction.Modify:
          handleLeaveModify();
          break;
      
        default:
          break;
      }
    };
    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        leaveUid: match.params.leaveUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: RequestDetailProps) {
    if (nextProps.leaveRequestState.detail.response !== this.props.leaveRequestState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.leaveRequestState.detail;
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
          id: LeaveRequestUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: LeaveRequestUserAction.Modify,
          name: intl.formatMessage({id: 'leave.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
        },
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, leaveRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    leaveRequestDispatch.loadDetailDispose();
  }
};

export const RequestDetail = compose<RequestDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLeaveRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<RequestDetailProps, Handler>(handlerCreators),
  lifecycle<RequestDetailProps, OwnState>(lifecycles),
)(RequestDetailView);
