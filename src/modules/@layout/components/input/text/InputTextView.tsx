import { TextField } from '@material-ui/core';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputTextProps } from './InputText';

export const InputTextView: React.SFC<InputTextProps> = props => {
  const { input, required, label, placeholder, disabled, meta } = props;

  return (
    <TextField
      fullWidth
      margin="normal"
      {...input}
      label={label}
      required={required}
      placeholder={placeholder}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
      helperText={meta.touched && meta.error}
    />
  );
};