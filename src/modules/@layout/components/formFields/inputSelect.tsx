import { rootStore } from '@generic/roots';
import CustomerLookup from '@lookup/components/controls/CustomerLookup';
import { ICustomerList } from '@lookup/interfaces/response';
import * as React from 'react';

export const inputSelect = ({ 
  input, 
  label, 
  disabled, 
  required, 
  meta: { 
    touched, 
    error, 
    warning,
    submitting
  }
}: any) => {
  const handleOnChange = (customer: ICustomerList) => { 
    input.onChange(customer);
  };

  return (    
    <CustomerLookup 
      {...rootStore}
      input={input}
      label={label}
      {...disabled}
      onSelected={handleOnChange}
    />
  );
};