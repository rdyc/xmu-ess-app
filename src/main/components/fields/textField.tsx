import * as React from 'react';
import { TextField } from '@material-ui/core';

const textField = ({ 
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

export default textField;