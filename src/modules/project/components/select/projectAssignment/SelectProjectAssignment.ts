import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectProjectAssignmentView } from './SelectProjectAssignmentView';

interface OwnProps extends IProjectAssignmentGetListFilter, WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
}

export type SelectProjectAssignmentProps 
  = WithProjectAssignment
  & WithWidth
  & OwnProps;

const lifecycles: ReactLifeCycleFunctions<SelectProjectAssignmentProps, {}> = {
  componentDidMount() {
    const { customerUid, employeeUid, projectTypes, } = this.props;
    const { isLoading, response } = this.props.projectAssignmentState.list;
    const { loadListRequest } = this.props.projectAssignmentDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter: {
          customerUid,
          employeeUid,
          projectTypes
        }
      });
    }
  }
};

export const SelectProjectAssigment = compose<SelectProjectAssignmentProps, OwnProps>(
  withProjectAssignment,
  withWidth(),
  lifecycle(lifecycles)
)(SelectProjectAssignmentView);