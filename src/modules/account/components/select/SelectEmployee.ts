import { IEmployeeListFilter } from '@account/classes/filters';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  withHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectEmployeeView } from './SelectEmployeeView';

interface IOwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
  filter?: IEmployeeListFilter;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
}

export type SelectEmployeeProps 
  = WithAccountEmployee
  & WithWidth
  & IOwnHandlers
  & IOwnProps;

const handlerCreators: HandleCreators<SelectEmployeeProps, IOwnHandlers> = {
  handleOnLoadApi: (props: SelectEmployeeProps) => () => {
    props.accountEmployeeDispatch.loadListRequest({
      filter: props.filter
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
        // comparing some props
        const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        }
      }
    }
  }
};

export const SelectEmployee = compose<SelectEmployeeProps, IOwnProps>(
  withAccountEmployee,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('SelectEmployee'),
  withWidth()
  )(SelectEmployeeView);