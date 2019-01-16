import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeAccessView } from './AccountEmployeeAccessView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeAccessProps
  = RouteComponentProps<OwnRouteParams>
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeAccess;

export const AccountEmployeeAccess = compose<AccountEmployeeAccessProps, {}>(
  withUser,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeAccess,
)(AccountEmployeeAccessView);