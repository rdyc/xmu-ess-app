import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

import { WithAccountEmployeeAccessHistory, withAccountEmployeeAccessHistory } from '@account/hoc/withAccountEmployeeAccessHistory';
import { AccountEmployeeAccessHistoryDetailView } from './AccountEmployeeAccessHistoryDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  historyUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type AccountEmployeeAccessHistoryDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployeeAccessHistory
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeAccessHistoryDetailProps, IOwnState> = (props: AccountEmployeeAccessHistoryDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<AccountEmployeeAccessHistoryDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: AccountEmployeeAccessHistoryDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeAccessHistoryDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeAccessHistoryDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && props.match.params.historyUid && !props.accountEmployeeAccessHistoryState.detail.isLoading) {
      props.accountEmployeeAccessHistoryDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        historyUid: props.match.params.historyUid
      });
    }
  },
  handleOnSelectedMenu: (props: AccountEmployeeAccessHistoryDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessHistoryDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeAccessHistoryDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid ||
        this.props.match.params.historyUid !== prevProps.match.params.historyUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeAccessHistoryState.detail.response !== prevProps.accountEmployeeAccessHistoryState.detail.response) {
      const { isLoading } = this.props.accountEmployeeAccessHistoryState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};
 
export const AccountEmployeeAccessHistoryDetail = compose<AccountEmployeeAccessHistoryDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployeeAccessHistory,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessHistoryDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('AccountEmployeeAccessHistoryDetail')
)(AccountEmployeeAccessHistoryDetailView);