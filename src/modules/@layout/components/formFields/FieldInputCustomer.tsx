import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { LookupCustomerSelect } from '@lookup/components/customer/selector/LookupCustomerSelect';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { TextField } from '@material-ui/core';
import * as React from 'react';
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

interface Customer {
  uid: string;
  name: string;
}

interface OwnProps { 
  label: string; 
  disabled: boolean;
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

type AllProps 
  = WithUser
  & WithLookupCustomer
  & WrappedFieldProps 
  & BaseFieldProps 
  & OwnProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers;

const fieldInputCustomer: React.SFC<AllProps> = props => {
  const { 
    input, disabled, label, meta, isOpen, getValueName, 
    handleDialogClose, handleDialogOpen, handleSelected
  } = props;
  const { user } = props.userState;

  const value = getValueName();

  return ( 
    <React.Fragment>
      <TextField
        fullWidth
        margin="normal"
        name={input.name}
        label={label}
        value={value}
        disabled={disabled || meta.submitting}
        error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
        helperText={meta.touched && meta.error}
        onClick={() => handleDialogOpen()}
      />
      <LookupCustomerSelect
        isOpen={isOpen}
        onSelected={handleSelected}
        onClose={handleDialogClose}
        filter={{
          companyUid: user && user.company.uid
        }}
      />
    </React.Fragment>   
  );
};

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

const handlerCreators: HandleCreators<AllProps, OwnHandlers> = {
  handleDialogOpen: (props: AllProps) => () => {
    props.setDialogVisibility();
  },
  handleDialogClose: (props: AllProps) => () => {
    props.setDialogVisibility();
  },
  handleSelected: (props: AllProps) => (customer: ICustomerList) => {
    props.setDialogVisibility();

    props.input.onChange(customer.uid);
  },
  getValueName: (props: AllProps) => (): string => {
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

export const FieldInputCustomer = compose<AllProps, {}>(
  withUser,
  withLookupCustomer,
  withStateHandlers<OwnState, OwnStateUpdaters>(createProps, stateUpdaters), 
  withHandlers<AllProps, OwnHandlers>(handlerCreators)
)(fieldInputCustomer);