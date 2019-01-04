import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeEducationView } from './AccountEmployeeEducationView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeEducationProps
  = OwnOption
  & WithUser
  & WithAccountEmployeeEducation;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeEducationState.list;
    const { loadListRequest } = this.props.accountEmployeeEducationDispatch;

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

export const AccountEmployeeEducation = compose<AccountEmployeeEducationProps, OwnOption>(
  withUser,
  withAccountEmployeeEducation,
  lifecycle(lifecycles)
)(AccountEmployeeEducationView);