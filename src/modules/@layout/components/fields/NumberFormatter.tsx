import * as React from 'react';
import NumberFormat from 'react-number-format';

interface NumberFormatterProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

export const NumberFormatter = (props: NumberFormatterProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      thousandSeparator
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );
};