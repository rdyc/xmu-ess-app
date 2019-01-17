import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectEmployeeView } from './SelectEmployeeView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
  companyUids?: string;
  roleUids?: string;
  positionUids?: string;
}

export type SelectEmployeeProps 
  = WithAccountEmployee
  & WithWidth
  & OwnProps;

const lifecycles: ReactLifeCycleFunctions<SelectEmployeeProps, {}> = {
  componentDidMount() {
    const { companyUids, roleUids, positionUids } = this.props;
    const { isLoading } = this.props.accountEmployeeState.list;
    const { loadListRequest } = this.props.accountEmployeeDispatch;

    if (!isLoading) {
      loadListRequest({
        filter: {
          companyUids,
          roleUids,
          positionUids,
          direction: 'ascending',
          orderBy: 'fullName'
        }
      });
    }
  }
};

export const SelectEmployee = compose<SelectEmployeeProps, OwnProps>(
  withAccountEmployee,
  withWidth(),
  lifecycle(lifecycles)
)(SelectEmployeeView);