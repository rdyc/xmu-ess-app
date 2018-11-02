import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetApprovalDetailView } from '@timesheet/components/approval/timesheetApproval/detail/TimesheetApprovalDetailView';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  withHandlers,
} from 'recompose';

interface Handler {
  handleTimesheetRefresh: () => void;
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
  timesheetUid: string;
}

export type ApprovalDetailProps
  = WithTimesheetApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const handlerCreators: HandleCreators<ApprovalDetailProps, Handler> = {
  handleTimesheetRefresh: (props: ApprovalDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.timesheetApprovalDispatch;

    if (user) {
      loadDetailRequest({
        timesheetUid: match.params.timesheetUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ApprovalDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleTimesheetRefresh,
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.timesheetApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetApproval,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage({id: 'timesheet.detail.title'}),
      subTitle : intl.formatMessage({id: 'timesheet.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case TimesheetUserAction.Refresh:
          handleTimesheetRefresh();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        timesheetUid: match.params.timesheetUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }
  },
  componentWillReceiveProps(nextProps: ApprovalDetailProps) {
    if (nextProps.timesheetApprovalState.detail.response !== this.props.timesheetApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;
      
      const currentMenus = [
        {
          id: TimesheetUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, timesheetApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    timesheetApprovalDispatch.loadDetailDispose();
  }
};

export const TimesheetApprovalDetail = compose<ApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTimesheetApproval,
  injectIntl, 
  withHandlers<ApprovalDetailProps, Handler>(handlerCreators),
  lifecycle<ApprovalDetailProps, OwnState>(lifecycles),
)(TimesheetApprovalDetailView);