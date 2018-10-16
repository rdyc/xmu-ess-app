import { rootStore } from '@generic/roots';
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

  const handleOnChangeValue = (customerUid: string) => {
    input.onChange(customerUid);
  };

  return (    
    <CustomerLookupComponent 
      {...rootStore}
      {...props}
      onChangeValue={handleOnChangeValue}
    />
  );
};