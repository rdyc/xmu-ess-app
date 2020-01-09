import { TextField } from '@material-ui/core';
import * as React from 'react';

import { InputFileProps } from './InputFile';

export const InputFileView: React.SFC<InputFileProps> = props => (
  <TextField
    type="file" 
    inputProps={{
      accept: props.accept
    }}
    InputLabelProps={{ 
      shrink: true 
    }}
    fullWidth={true}
    margin="normal"
    name={props.input.name}
    label={props.label}
    required={props.required}
    placeholder={props.placeholder}
    disabled={props.disabled || props.meta.submitting}
    error={props.meta.touched && !(props.meta.error === undefined || props.meta.error === null)}
    helperText={props.meta.touched && props.meta.error}
    onChange={props.handleOnChange}
  />
);