import { TextField } from '@material-ui/core';
import { InputComponentProps } from '@material-ui/core/Input';
import * as React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { isNullOrUndefined, isUndefined } from 'util';
import { InputLookupNumberProps } from './InputLookupNumber';

export const InputLookupNumberView: React.SFC<InputLookupNumberProps> = props => {
  const { input, label, required, disabled, meta, placeholder } = props;
  
  let _value: number;

  const InputLookupNumberComponent = (compProps: InputComponentProps) => (
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
        inputComponent: InputLookupNumberComponent
      }}
    />
  );

  return render;
};