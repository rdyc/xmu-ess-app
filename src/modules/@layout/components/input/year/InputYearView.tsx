import { MenuItem, TextField } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputYearProps } from './InputYear';

export const InputYearView: React.SFC<InputYearProps> = props => {
  const { input, required, placeholder, disabled, meta, label } = props;

  const getYear: number = Number(moment().format('YYYY'));

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
      <MenuItem value={getYear - 1}>
        {getYear - 1}
      </MenuItem>
      <MenuItem value={getYear}>
        {getYear}
      </MenuItem>
      <MenuItem value={getYear + 1}>
        {getYear + 1}
      </MenuItem>
    </TextField>
  );
};
