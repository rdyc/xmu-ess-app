import { TextField } from '@material-ui/core';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputDateEndProps } from './InputDateEnd';

export const InputDateEndView: React.SFC<InputDateEndProps> = props => (
  <TextField
    fullWidth={true}
    margin="normal"
    name={props.input.name}
    value={props.value && props.value.end}
    label={props.label}
    required={props.required}
    placeholder={props.placeholder}
    disabled={true}
    error={props.meta.touched && !isNullOrUndefined(props.meta.error) ? true : false}
    helperText={props.meta.touched && props.meta.error}
    onChange={props.handleOnChange}
    onBlur={props.handleOnBlur}
    multiline={props.multiline}
  />
);