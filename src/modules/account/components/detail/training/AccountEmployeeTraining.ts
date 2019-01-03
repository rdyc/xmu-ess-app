import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeTrainingView } from './AccountEmployeeTrainingView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeTrainingProps
  = OwnOption
  & WithUser
  & WithAccountEmployeeTraining;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeTrainingState.list;
    const { loadListRequest } = this.props.accountEmployeeTrainingDispatch;

    if (user && !isLoading && !response && employeeUid) {
      loadListRequest({
        employeeUid
      });
    }
  }
};

export const AccountEmployeeTraining = compose<AccountEmployeeTrainingProps, OwnOption>(
  withUser,
  withAccountEmployeeTraining,
  lifecycle(lifecycles)
)(AccountEmployeeTrainingView);