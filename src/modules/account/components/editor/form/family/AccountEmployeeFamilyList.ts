import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeFamilyListView } from './AccountEmployeeFamilyListView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeFamilyListProps
  = OwnOption
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeFamily;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyListProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeFamilyState.list;
    const { loadListRequest } = this.props.accountEmployeeFamilyDispatch;

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

export const AccountEmployeeFamilyList = compose<AccountEmployeeFamilyListProps, OwnOption>(
  withUser,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeFamily,
  lifecycle(lifecycles)
)(AccountEmployeeFamilyListView);