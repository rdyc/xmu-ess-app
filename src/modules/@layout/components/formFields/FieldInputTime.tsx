import { TimePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface FromFieldProps {
  format?: string | undefined;
  type?: string;
  label: string;
  disabled: boolean;
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps; // & InjectedIntlProps;

export const FieldInputTime: React.SFC<AllProps> = props => {
  const { input, label, disabled, meta } = props;

  return (
    <TimePicker
      fullWidth
      margin="normal"
      {...input}
      label={label}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={(moment: Moment) => input.onChange(moment.toISOString(true))}
      invalidLabel={''}
    />
  );
};