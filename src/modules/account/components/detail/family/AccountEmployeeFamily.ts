import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  & WithAccountEmployeeFamily;

export const AccountEmployeeFamily = compose<AccountEmployeeFamilyProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeFamily,
)(AccountEmployeeFamilyView);