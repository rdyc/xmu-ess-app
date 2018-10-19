import { TextField } from '@material-ui/core';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputEmployeeProps } from './InputEmployee';

export const InputEmployeeView: React.SFC<InputEmployeeProps> = props => {
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