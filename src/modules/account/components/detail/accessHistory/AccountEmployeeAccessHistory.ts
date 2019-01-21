import { WithAccountEmployeeAccessHistory, withAccountEmployeeAccessHistory } from '@account/hoc/withAccountEmployeeAccessHistory';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  & WithAccountEmployeeAccessHistory;

export const AccountEmployeeAccessHistory = compose<AccountEmployeeAccessHistoryProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeAccessHistory
)(AccountEmployeeAccessHistoryView);