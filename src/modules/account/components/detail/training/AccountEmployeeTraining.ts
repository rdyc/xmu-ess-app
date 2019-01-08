import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeTrainingView } from './AccountEmployeeTrainingView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeTrainingProps
  = OwnOption
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeTraining;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeTrainingState.list;
    const { loadListRequest } = this.props.accountEmployeeTrainingDispatch;

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

export const AccountEmployeeTraining = compose<AccountEmployeeTrainingProps, OwnOption>(
  withUser,
  injectIntl,
  withStyles(styles),
  withAccountEmployeeTraining,
  lifecycle(lifecycles)
)(AccountEmployeeTrainingView);