import { WithUser, withUser } from '@layout/hoc/withUser';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { TimesheetApprovalFilterView } from './TimesheetApprovalFilterView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
}

export type ApprovalFilterProps
  = WithTimesheetApproval
  & WithWidth
  & WithUser
  & OwnProps;

const lifecycles: ReactLifeCycleFunctions<ApprovalFilterProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.timesheetApprovalState.all;
    const { loadAllRequest } = this.props.timesheetApprovalDispatch;

    if (user && !isLoading && !response) {
      loadAllRequest({
        filter: {
          companyUid: user.company.uid,
          status: 'pending',
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

export const TimesheetApprovalFilter = compose<ApprovalFilterProps, OwnProps>(
  withTimesheetApproval,
  withUser,
  withWidth(),
  lifecycle(lifecycles)
)(TimesheetApprovalFilterView);