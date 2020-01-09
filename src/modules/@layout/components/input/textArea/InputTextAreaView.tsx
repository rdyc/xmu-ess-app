import { TextField } from '@material-ui/core';
import * as React from 'react';

import { InputTextAreaProps } from './InputTextArea';

export const InputTextAreaView: React.SFC<InputTextAreaProps> = props => (
  <TextField
    multiline={true}
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
  />
);