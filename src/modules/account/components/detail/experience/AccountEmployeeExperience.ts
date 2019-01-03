import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { AccountEmployeeExperienceView } from './AccountEmployeeExperienceView';

interface OwnOption {
  employeeUid: string;
}

export type AccountEmployeeExperienceProps
  = OwnOption
  & WithUser
  & WithAccountEmployeeExperience;

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceProps, {}> = {
  componentDidMount() {
    const { employeeUid } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.accountEmployeeExperienceState.list;
    const { loadListRequest } = this.props.accountEmployeeExperienceDispatch;

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

export const AccountEmployeeExperience = compose<AccountEmployeeExperienceProps, OwnOption>(
  withUser,
  withAccountEmployeeExperience,
  lifecycle(lifecycles)
)(AccountEmployeeExperienceView);