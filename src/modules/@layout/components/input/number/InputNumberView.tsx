import { TextField } from '@material-ui/core';
import { InputComponentProps } from '@material-ui/core/Input';
import * as React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { isNullOrUndefined } from 'util';

import { InputNumberProps } from './InputNumber';

export const InputNumberView: React.SFC<InputNumberProps> = props => {
  const { input, label, required, disabled, meta, placeholder, value } = props;
  
  let x = value;

  const inputNumberComponent = (compProps: InputComponentProps) => (
    <NumberFormat 
      value={value as number} 
      disabled={disabled}
      className={compProps.className}
      thousandSeparator={true} 
      onValueChange={(values: NumberFormatValues) => {
        x = values.floatValue;
      }}
      onBlur={() => input.onChange(x)}
    />
  );

  const render = (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      placeholder={placeholder}
      value={value}
      required={required}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        inputComponent: inputNumberComponent
      }}
    />
  );

  return render;
};