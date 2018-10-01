import { TextField, MenuItem } from '@material-ui/core';
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
}: any) => (
  <TextField
    select
    fullWidth
    margin="normal"
    {...input}
    label={label}
    disabled={disabled || submitting}
    error={touched && error}
    helperText={touched && error}
  >
    <MenuItem value={input.value}>
      {input.value}
    </MenuItem>
  </TextField>
);