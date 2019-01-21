import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeExperienceView } from './AccountEmployeeExperienceView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeExperienceProps
  = WithUser
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithStyles<typeof styles>
  & WithAccountEmployeeExperience;

// const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceProps, {}> = {
//   componentDidMount() {
//     const { user } = this.props.userState;
//     const { isLoading, response } = this.props.accountEmployeeExperienceState.list;
//     const { loadListRequest } = this.props.accountEmployeeExperienceDispatch;

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

export const AccountEmployeeExperience = compose<AccountEmployeeExperienceProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeExperience,
  // lifecycle(lifecycles)
)(AccountEmployeeExperienceView);