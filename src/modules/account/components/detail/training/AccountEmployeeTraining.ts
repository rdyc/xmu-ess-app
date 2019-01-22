import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  & WithAccountEmployeeTraining;

export const AccountEmployeeTraining = compose<AccountEmployeeTrainingProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeTraining,
)(AccountEmployeeTrainingView);