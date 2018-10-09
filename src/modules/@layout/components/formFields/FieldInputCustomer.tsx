import { rootStore } from '@generic/roots';
import { ICustomerList } from '@lookup/classes/response';
import { CustomerLookupComponent } from '@lookup/components/customer';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface FromFieldProps { 
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps & WithWidth;

export const FieldInputCustomer: React.SFC<AllProps> = props => {
  const { input } = props;

  const handleOnChangeValue = (customer: ICustomerList) => {
    input.onChange(customer);
  };

  return (    
    <CustomerLookupComponent 
      {...rootStore}
      {...props}
      onChangeValue={handleOnChangeValue}
    />
  );
};