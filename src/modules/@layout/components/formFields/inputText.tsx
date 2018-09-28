import { TextField } from '@material-ui/core';
import * as React from 'react';

export const inputText = ({ 
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
    margin="normal"
    {...input}
    disabled={disabled || submitting}
    error={touched && error}
    helperText={touched && error}
  />
);