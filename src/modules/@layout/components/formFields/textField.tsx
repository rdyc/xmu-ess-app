import { TextField } from '@material-ui/core';
import * as React from 'react';

export const textField = ({ 
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
}: any) => (
  <TextField
    fullWidth
    disabled={disabled || submitting}
    required={required}
    label={label}
    error={touched && error}
    helperText={touched && error}
    {...input}
  />
);