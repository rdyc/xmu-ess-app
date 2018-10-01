import { TextField } from '@material-ui/core';
import * as React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

export const inputNumber = ({ 
  input, 
  label,
  disabled,
  required,  
  meta: { 
    touched, 
    error, 
    warning,
    submitting
  }
}: any) => {

  const NumberFormatComponent = (props: any) => {
    const { onChange, name, value, className, inputRef } = props;

    let _value = value;

    return (
      <NumberFormat 
        name={name} 
        value={value} 
        disabled={props.disabled}
        className={className} 
        getInputRef={inputRef}
        thousandSeparator={true} 
        onValueChange={(values: NumberFormatValues) => {
          _value = values.floatValue;
        }}
        onBlur={(e: any) => {
          onChange(_value);
        }}
      />
    );
  };
  
  return (
    <TextField
      fullWidth
      margin="normal"
      {...input}
      label={label}
      disabled={disabled || submitting}
      error={touched && error}
      helperText={touched && error}
      InputProps={{
        inputComponent: NumberFormatComponent
      }}
    />
  );
};