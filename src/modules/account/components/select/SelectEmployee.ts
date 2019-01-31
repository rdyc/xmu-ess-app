import { IEmployeeListFilter } from '@account/classes/filters';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
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
  filter?: IEmployeeListFilter;
}

interface OwnHandlers {
  handleOnLoadApi: () => void;
}

export type SelectEmployeeProps 
  = WithAccountEmployee
  & WithWidth
  & OwnHandlers
  & OwnProps;

const handlerCreators: HandleCreators<SelectEmployeeProps, OwnHandlers> = {
  handleOnLoadApi: (props: SelectEmployeeProps) => () => {
    props.accountEmployeeDispatch.loadListRequest({
      filter: {
        companyUids: props.companyUids,
        roleUids: props.roleUids,
        positionUids: props.positionUids,
        orderBy: 'fullName'
      }
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<SelectEmployeeProps, {}> = {
  componentDidMount() {
    const { request } = this.props.accountEmployeeState.list;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      if (request.filter) {
        // comparing filter props
        const shouldUpdate = !shallowEqual(
          {
            companyUids: request.filter.companyUids,
            roleUids: request.filter.roleUids,
            positionUids: request.filter.positionUids,
          },
          {
            companyUids: this.props.companyUids,
            roleUids: this.props.roleUids,
            positionUids: this.props.positionUids,
          },
        );
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        }
      }
    }
  }
};

export const SelectEmployee = compose<SelectEmployeeProps, OwnProps>(
  withAccountEmployee,
  withWidth(),
  withHandlers<SelectEmployeeProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectEmployeeProps, {}>(lifecycles)
)(SelectEmployeeView);