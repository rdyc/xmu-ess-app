import { TimePicker } from 'material-ui-pickers';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import { Moment } from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputTimeProps } from './InputTime';

export const InputTimeView: React.SFC<InputTimeProps> = props => {
  const { timeFormat, input, required, label, disabled, meta } = props;

  const labelFunction = (date: MaterialUiPickersDate, invalidLabel: string): string => {
    let result: string = invalidLabel;

    if (date.isValid()) {
      result = date.format('HH:mm');
    } 

    return result;
  };

  const render = (
    <TimePicker
      fullWidth
      margin="normal"
      ampm={false}
      showTodayButton={false}
      format={input.value ? timeFormat || 'HH:mm' : undefined}
      {...input}
      label={label}
      required={required}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={(moment: Moment) => input.onChange(moment.toISOString(true))}
      labelFunc={labelFunction}
      invalidLabel={''}
    />
  );

  return render;
};