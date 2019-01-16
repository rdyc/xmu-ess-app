import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeEducationView } from './AccountEmployeeEducationView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeEducationProps
  = WithUser
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithStyles<typeof styles>
  & WithAccountEmployeeEducation;

// const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationProps, {}> = {
//   componentDidMount() {
//     const { user } = this.props.userState;
//     const { isLoading, response } = this.props.accountEmployeeEducationState.list;
//     const { loadListRequest } = this.props.accountEmployeeEducationDispatch;

//     if (user && !isLoading && !response ) {
//       loadListRequest({
//         employeeUid: this.props.match.params.employeeUid,
//         filter: {
//           direction: 'ascending'
//         }
//       });
//     }
//   }
// };

export const AccountEmployeeEducation = compose<AccountEmployeeEducationProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeEducation,
  // lifecycle(lifecycles)
)(AccountEmployeeEducationView);