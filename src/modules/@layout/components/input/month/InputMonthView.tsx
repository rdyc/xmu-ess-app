import { MenuItem, TextField } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputMonthProps } from './InputMonth';

export const InputMonthView: React.SFC<InputMonthProps> = props => {
  const { input, required, placeholder, disabled, meta, label } = props;

  return (
    <TextField
      select
      fullWidth
      margin="normal"
      label={label}
      {...input}
      required={required}
      placeholder={placeholder}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
      helperText={meta.touched && meta.error}
    >
      {moment.months().map((item, i) => (
        <MenuItem key={item} value={i + 1}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};
