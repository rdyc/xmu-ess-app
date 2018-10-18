import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

import { InputCustomerView } from './InputCustomerView';

interface Customer {
  uid: string;
  name: string;
}

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  label: string; 
  disabled: boolean;
  required?: boolean;
  initialValue?: Customer | undefined;
}

interface OwnState {
  isOpen: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDialogVisibility: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  handleSelected: (customer: ICustomerList) => void;
  getValueName: () => string;
}

export type InputCustomerProps 
  = WithUser
  & WithLookupCustomer
  & OwnProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers;

const createProps: mapper<{}, OwnState> = (props: {}): OwnState => {
  return { 
    isOpen: false
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setDialogVisibility: (prevState: OwnState) => () => {
    return {
      isOpen: !prevState.isOpen
    };
  }
};

const handlerCreators: HandleCreators<InputCustomerProps, OwnHandlers> = {
  handleDialogOpen: (props: InputCustomerProps) => () => {
    props.setDialogVisibility();
  },
  handleDialogClose: (props: InputCustomerProps) => () => {
    props.setDialogVisibility();
  },
  handleSelected: (props: InputCustomerProps) => (customer: ICustomerList) => {
    props.setDialogVisibility();

    props.input.onChange(customer.uid);
  },
  getValueName: (props: InputCustomerProps) => (): string => {
    const { input, initialValue } = props;
    const { response } = props.lookupCustomerState.list;
    
    let result: string = '';

    if (initialValue) {
      // load initial value
      result = initialValue.name;
    } else {
      // load from redux state
      if (response && response.data) {
        const customer = response.data.find(item => item.uid === input.value);
  
        if (!isNullOrUndefined(customer)) {
          result = customer.name;
        }
      }
    }

    return result;
  }
};

export const InputCustomer = compose<InputCustomerProps, {}>(
  withUser,
  withLookupCustomer,
  withStateHandlers<OwnState, OwnStateUpdaters>(createProps, stateUpdaters), 
  withHandlers<InputCustomerProps, OwnHandlers>(handlerCreators)
)(InputCustomerView);