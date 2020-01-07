import { TextField } from '@material-ui/core';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import * as React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { isNullOrUndefined, isUndefined } from 'util';

import { InputContactNumberProps } from './InputContactNumber';

export const InputContactNumberView: React.SFC<InputContactNumberProps> = props => {
  const { input, label, required, disabled, meta, placeholder } = props;
  
  let _value: number;

  const InputContactNumberComponent = (compProps: InputBaseComponentProps) => (
    <NumberFormat 
      value={input.value} 
      disabled={disabled}
      className={compProps.className}
      thousandSeparator={false} 
      onValueChange={(values: NumberFormatValues) => {
        _value = isUndefined(values.floatValue) ? 0 : values.floatValue;
      }}
      onBlur={() => input.onChange(_value)}
    />
  );

  const render = (
    <TextField
      type="number"
      fullWidth
      margin="normal"
      {...input}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        inputComponent: InputContactNumberComponent
      }}
    />
  );

  return render;
};