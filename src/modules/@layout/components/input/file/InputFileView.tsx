import { TextField } from '@material-ui/core';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputFileProps } from './InputFile';

export const InputFileView: React.SFC<InputFileProps> = props => (
  <TextField
    type="file"
    fullWidth={true}
    margin="normal"
    name={props.input.name}
    label={props.label}
    required={props.required}
    placeholder={props.placeholder}
    disabled={props.disabled || props.meta.submitting}
    error={props.meta.touched && !isNullOrUndefined(props.meta.error) ? true : false}
    helperText={props.meta.touched && props.meta.error}
    onChange={props.handleOnChange}
    onBlur={props.handleOnBlur}
  />
);