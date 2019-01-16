import { WithAccountEmployeeAccessHistory, withAccountEmployeeAccessHistory } from '@account/hoc/withAccountEmployeeAccessHistory';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeAccessHistoryView } from './AccountEmployeeAccessHistoryView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeAccessHistoryProps
  = WithUser
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithStyles<typeof styles>
  & WithAccountEmployeeAccessHistory;

// const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessHistoryProps, {}> = {
//   componentDidMount() {
//     const { user } = this.props.userState;
//     const { isLoading, response } = this.props.accountEmployeeAccessHistoryState.list;
//     const { loadListRequest } = this.props.accountEmployeeAccessHistoryDispatch;

//     if (user && !isLoading && !response) {
//       loadListRequest({
//         employeeUid: this.props.match.params.employeeUid,
//         filter: {
//           direction: 'ascending'
//         }
//       });
//     }
//   }
// };

export const AccountEmployeeAccessHistory = compose<AccountEmployeeAccessHistoryProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeAccessHistory,
  // lifecycle(lifecycles)
)(AccountEmployeeAccessHistoryView);