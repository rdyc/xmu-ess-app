import { TextField } from '@material-ui/core';
import { InputComponentProps } from '@material-ui/core/Input';
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface FromFieldProps { 
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps;

export const FieldInputNumber: React.SFC<AllProps> = props => {
  const { input, label, disabled, meta } = props;

  const NumberFormatComponent = (inputProps: InputComponentProps) => {
    const { name, value, className, inputRef } = inputProps;

    let _value = value;

    return (
      <NumberFormat 
        name={name} 
        value={value as number} 
        disabled={inputProps.disabled}
        className={className} 
        getInputRef={inputRef}
        thousandSeparator={true} 
        onValueChange={(values: any) => {
          _value = values.floatValue;
        }}
        onBlur={(e: any) => {
          input.onChange(_value);
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
      disabled={disabled || meta.submitting}
      error={!isNullOrUndefined(meta.error)}
      helperText={meta.error}
      InputProps={{
        inputComponent: NumberFormatComponent
      }}
    />
  );
};