import { rootStore } from '@generic/roots';
import { ICustomerList } from '@lookup/classes/response';
import CustomerLookup from '@lookup/components/controls/CustomerLookup';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface FromFieldProps { 
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps & WithWidth;

export const FieldInputCustomer: React.StatelessComponent<AllProps> = props => {
  const { input } = props;

  const handleOnChangeValue = (customer: ICustomerList) => {
    input.onChange(customer);
  };

  return (    
    <CustomerLookup 
      {...rootStore}
      {...props}
      onChangeValue={handleOnChangeValue}
    />
  );
};