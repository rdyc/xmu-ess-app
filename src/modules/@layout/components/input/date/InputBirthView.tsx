import { TextField } from '@material-ui/core';
import * as React from 'react';

import { InputBirthProps } from './InputBirth';

export const InputBirthView: React.SFC<InputBirthProps> = props => (
  <TextField
    type={props.type}
    fullWidth={true}
    margin="normal"
    name={props.input.name}
    value={props.value}
    label={props.label}
    required={props.required}
    placeholder={props.placeholder}
    disabled={props.disabled || props.meta.submitting}
    error={props.meta.touched && !(props.meta.error === undefined || props.meta.error === null)}
    helperText={props.meta.touched && props.meta.error}
    onChange={props.handleOnChange}
    onBlur={props.handleOnBlur}
    inputProps={{
      maxLength: props.maxChar
    }}
    InputLabelProps={{
      shrink: true
    }}
  />
);