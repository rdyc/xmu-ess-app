import { TextField } from '@material-ui/core';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import * as React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { InputColoredNumberProps } from './InputColoredNumber';

export const InputColoredNumberView: React.SFC<InputColoredNumberProps> = props => {
  const { input, label, required, disabled, disableInput, meta, placeholder, classes } = props;
  
  let _value: number;

  const inputColoredNumberComponent = (compProps: InputBaseComponentProps) => (
    <NumberFormat 
      value={input.value} 
      disabled={disableInput}
      className={compProps.className}
      thousandSeparator={true} 
      allowNegative={false}
      onValueChange={(values: NumberFormatValues) => {
        _value = (values.floatValue === undefined) ? 0 : values.floatValue;
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
      error={meta.touched && !(meta.error === undefined || meta.error === null)}
      helperText={meta.touched && meta.error}
      InputProps={{
        inputComponent: inputColoredNumberComponent,
        className: input.value >= 0 ? classes.colorBlue : classes.colorRed
      }}
    />
  );

  return render;
};