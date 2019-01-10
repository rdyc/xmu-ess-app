import { WithAccountEmployeeAccessHistory, withAccountEmployeeAccessHistory } from '@account/hoc/withAccountEmployeeAccessHistory';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeAccessHistoryView } from './AccountEmployeeAccessHistoryView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeAccessHistoryProps
  = OwnOption
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
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
          direction: 'ascending'
        }
      });
    }
  }
};

export const AccountEmployeeAccessHistory = compose<AccountEmployeeAccessHistoryProps, OwnOption>(
  withUser,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeAccessHistory,
  lifecycle(lifecycles)
)(AccountEmployeeAccessHistoryView);