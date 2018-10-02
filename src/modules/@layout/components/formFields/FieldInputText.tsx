import { TextField } from '@material-ui/core';
import * as React from 'react';
import { WrappedFieldProps, BaseFieldProps } from 'redux-form';

interface FromFieldProps { 
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps;

export const FieldInputText: React.StatelessComponent<AllProps> = props => {
  const { input, label, disabled, meta } = props;

  return (
    <TextField
      fullWidth
      margin="normal"
      {...input}
      label={label}
      disabled={disabled || meta.submitting}
      error={meta.touched && meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};