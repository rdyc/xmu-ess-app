import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeMultiAccessView } from './AccountEmployeeMultiAccessView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeMultiAccessProps
  = OwnOption
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeAccess;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeMultiAccessProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeAccessState.list;
    const { loadListRequest } = this.props.accountEmployeeAccessDispatch;

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

export const AccountEmployeeMultiAccess = compose<AccountEmployeeMultiAccessProps, OwnOption>(
  withUser,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeAccess,
  lifecycle(lifecycles)
)(AccountEmployeeMultiAccessView);