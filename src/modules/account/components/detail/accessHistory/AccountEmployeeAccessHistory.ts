import { WithAccountEmployeeAccessHistory, withAccountEmployeeAccessHistory } from '@account/hoc/withAccountEmployeeAccessHistory';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeAccessHistoryView } from './AccountEmployeeAccessHistoryView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeAccessHistoryProps
  = OwnOption
  & WithUser
  & WithAccountEmployeeAccessHistory;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessHistoryProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeAccessHistoryState.list;
    const { loadListRequest } = this.props.accountEmployeeAccessHistoryDispatch;

    if (user && !isLoading && !response && employeeUid) {
      loadListRequest({
        employeeUid,
        filter: {
          direction: 'descending'
        }
      });
    }
  }
};

export const AccountEmployeeAccessHistory = compose<AccountEmployeeAccessHistoryProps, OwnOption>(
  withUser,
  withAccountEmployeeAccessHistory,
  lifecycle(lifecycles)
)(AccountEmployeeAccessHistoryView);