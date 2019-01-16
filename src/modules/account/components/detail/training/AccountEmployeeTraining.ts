import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeTrainingView } from './AccountEmployeeTrainingView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeTrainingProps
  = WithUser
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithStyles<typeof styles>
  & WithAccountEmployeeTraining;

// const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingProps, {}> = {
//   componentDidMount() {
//     const { user } = this.props.userState;
//     const { isLoading, response } = this.props.accountEmployeeTrainingState.list;
//     const { loadListRequest } = this.props.accountEmployeeTrainingDispatch;

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

export const AccountEmployeeTraining = compose<AccountEmployeeTrainingProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeTraining,
  // lifecycle(lifecycles)
)(AccountEmployeeTrainingView);