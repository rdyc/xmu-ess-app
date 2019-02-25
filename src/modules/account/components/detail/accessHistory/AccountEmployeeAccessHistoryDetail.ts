import { AppRole } from '@constants/AppRole';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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
  isAdmin: boolean;
  pageOptions?: IAppBarMenu[];
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
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
    isAdmin
  };
};

const stateUpdaters: StateUpdaters<AccountEmployeeAccessHistoryDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
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
  }
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessHistoryDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeAccessHistoryDetailProps) {
    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid ||
        this.props.match.params.historyUid !== prevProps.match.params.historyUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeAccessHistoryState.detail.response !== prevProps.accountEmployeeAccessHistoryState.detail.response) {
      const { isLoading } = this.props.accountEmployeeAccessHistoryState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
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