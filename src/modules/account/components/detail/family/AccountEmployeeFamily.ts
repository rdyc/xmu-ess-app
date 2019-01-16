import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeFamilyView } from './AccountEmployeeFamilyView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeFamilyProps
  = WithUser
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithStyles<typeof styles>
  & WithAccountEmployeeFamily;

// const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyProps, {}> = {
//   componentDidMount() {
//     const { user } = this.props.userState;
//     const { isLoading, response } = this.props.accountEmployeeFamilyState.list;
//     const { loadListRequest } = this.props.accountEmployeeFamilyDispatch;

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

export const AccountEmployeeFamily = compose<AccountEmployeeFamilyProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeFamily,
  // lifecycle(lifecycles)
)(AccountEmployeeFamilyView);