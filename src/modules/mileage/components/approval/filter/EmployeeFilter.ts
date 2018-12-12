import { WithUser, withUser } from '@layout/hoc/withUser';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { EmployeeFilterView } from './EmployeeFilterView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
}

export type EmployeeFilterProps
  = WithMileageApproval
  & WithWidth
  & WithUser
  & OwnProps;

const lifecycles: ReactLifeCycleFunctions<EmployeeFilterProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.mileageApprovalState.all;
    const { loadAllRequest } = this.props.mileageApprovalDispatch;

    if (user && !isLoading && !response) {
      loadAllRequest({
        filter: {
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          status: 'pending',
          isNotify: undefined,
          query: {
            direction: 'ascending',
            orderBy: undefined,
            page: undefined,
            size: undefined,
            find: undefined,
            findBy: undefined
          }
        }
      });
    }
  }
};

export const EmployeeFilter = compose<EmployeeFilterProps, OwnProps>(
  withMileageApproval,
  withUser,
  withWidth(),
  lifecycle(lifecycles)
)(EmployeeFilterView);