import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeFamilyView } from './AccountEmployeeFamilyView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeFamilyProps
  = OwnOption
  & WithUser
  & WithAccountEmployeeFamily;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeFamilyState.list;
    const { loadListRequest } = this.props.accountEmployeeFamilyDispatch;

    if (user && !isLoading && !response && employeeUid) {
      loadListRequest({
        employeeUid,
        filter: {
          direction: 'descending'
        }
      });
    }
  }
};

export const AccountEmployeeFamily = compose<AccountEmployeeFamilyProps, OwnOption>(
  withUser,
  withAccountEmployeeFamily,
  lifecycle(lifecycles)
)(AccountEmployeeFamilyView);