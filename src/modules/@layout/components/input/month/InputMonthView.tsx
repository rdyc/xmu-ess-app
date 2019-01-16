import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as moment from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputMonthProps } from './InputMonth';

export const InputMonthView: React.SFC<InputMonthProps> = props => {
  const { input, required, placeholder, disabled, meta, label, width } = props;

  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ? <option value="" /> : <MenuItem value="" />;

  const renderItem = (item: any, index: number) => {
    // render as native
    if (isMobile) {
      return (
        <option key={item} value={index + 1}>
          {item}
        </option>
      );
    }

    // render as material-ui
    if (!isMobile) {
      return (
        <MenuItem key={item} value={index + 1}>
          {item}
        </MenuItem>
      );
    }
    return null;
  };

  return (
    <TextField
      select
      fullWidth
      margin="normal"
      {...input}
      required={required}
      label={label}
      placeholder={placeholder}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
      helperText={meta.touched && meta.error}
      SelectProps={{
        native: isMobile
      }}
    >
      {isMobile ? renderItemEmpty : null }
      {moment.months().map((item, i) => renderItem(item, i))}
    </TextField>
  );
};
