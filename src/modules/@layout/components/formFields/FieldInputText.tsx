import { TextField } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface FromFieldProps { 
  type?: string; 
  placeholder?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps;

export const FieldInputText: React.SFC<AllProps> = props => {
  const { input, label, placeholder, disabled, meta } = props;

  return (
    <TextField
      fullWidth
      margin="normal"
      {...input}
      label={label}
      placeholder={placeholder}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};