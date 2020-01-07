import { GlobalFormat } from '@layout/types';
import { TextField } from '@material-ui/core';
import * as React from 'react';

import { InputDateEndProps } from './InputDateEnd';

export const InputDateEndView: React.SFC<InputDateEndProps> = props => {

  const render = (
    <TextField
      fullWidth={true}
      margin="normal"
      name={props.input.name}
      value={props.value && props.intl.formatDate(props.value, GlobalFormat.DateEnd)}
      label={props.label}
      required={props.required}
      placeholder={props.placeholder}
      disabled={props.disabled || props.meta.submitting}
      error={props.meta.touched && !(props.meta.error === undefined || props.meta.error === null)}
      helperText={props.meta.touched && props.meta.error}
      multiline={props.multiline}
    />
  );

  return render;
};