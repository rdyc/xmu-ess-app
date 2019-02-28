import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { WithTimesheetApprovalHistory, withTimesheetApprovalHistory } from '@timesheet/hoc/withTimesheetApprovalHistory';
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
  withStateHandlers 
} from 'recompose';

import { TimesheetApprovalHistoryDetailView } from './TimesheetApprovalHistoryDetailView';

interface IOwnRouteParams {
  timesheetUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: TimesheetUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type TimesheetApprovalHistoryDetailProps
  = WithOidc
  & WithUser
  & WithTimesheetApprovalHistory
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<TimesheetApprovalHistoryDetailProps, IOwnState> = (props: TimesheetApprovalHistoryDetailProps): IOwnState => {
  // checking admin status
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }

  return {
    isAdmin,
    shouldLoad: false,
  };
};

const stateUpdaters: StateUpdaters<TimesheetApprovalHistoryDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: TimesheetApprovalHistoryDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: TimesheetApprovalHistoryDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
};

const handlerCreators: HandleCreators<TimesheetApprovalHistoryDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: TimesheetApprovalHistoryDetailProps) => () => { 
    if (props.userState.user && !props.timesheetApprovalHistoryState.detail.isLoading && props.match.params.timesheetUid) {
      props.timesheetApprovalHistoryDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        timesheetUid: props.match.params.timesheetUid
      });
    }
  },
  handleOnSelectedMenu: (props: TimesheetApprovalHistoryDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case TimesheetUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<TimesheetApprovalHistoryDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: TimesheetApprovalHistoryDetailProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.timesheetUid !== prevProps.match.params.timesheetUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.timesheetApprovalHistoryState.detail.response !== prevProps.timesheetApprovalHistoryState.detail.response) {
      const { isLoading } = this.props.timesheetApprovalHistoryState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: TimesheetUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TimesheetApprovalHistoryDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withTimesheetApprovalHistory,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('TimesheetApprovalHistoryDetail')
)(TimesheetApprovalHistoryDetailView);