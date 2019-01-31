import { TextField } from '@material-ui/core';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputImageProps } from './InputImage';

export const InputImageView: React.SFC<InputImageProps> = props => (
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
    error={props.meta.touched && !isNullOrUndefined(props.meta.error) ? true : false}
    helperText={props.meta.touched && props.meta.error}
    onChange={props.handleImageChange}
  />
);