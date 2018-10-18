import { rootStore } from '@generic/roots';
import { LeaveLookupComponent } from '@lookup/components/leave';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface FromFieldProps { 
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps & WithWidth;

export const FieldInputLeave: React.SFC<AllProps> = props => {
  const { input } = props;

  const handleOnChangeValue = (customerUid: string) => {
    input.onChange(customerUid);
  };

  return (    
    <LeaveLookupComponent 
      {...rootStore}
      {...props}
      onChangeValue={handleOnChangeValue}
    />
  );
};