import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as moment from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputYearDegreeProps } from './InputYearDegree';

export const InputYearDegreeView: React.SFC<InputYearDegreeProps> = props => {
  const { input, required, placeholder, disabled, meta, label, width } = props;

  const isMobile = isWidthDown('sm', width);

  const getYear: number = Number(moment().format('YYYY'));
  const until: number = 30;
  const year: number[] = [];
  
  { for (let i: number = 1; i < until; i += 1) {
      year.push(getYear - i);
    } 
  }
  
  const renderItemEmpty = isMobile ? 
    <option value=""></option> : 
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: number) => {
    // render as native
    if (isMobile) {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    } 

    // render as material-ui
    if (!isMobile) {
      return (
        <MenuItem key={item} value={item}>
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
      label={label}
      {...input}
      required={required}
      placeholder={placeholder}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
      helperText={meta.touched && meta.error}
      SelectProps={{
        native: isMobile
      }}
    >
      {isMobile ? renderItemEmpty : null}
      {year.map(item => renderItem(item))}
    </TextField>
  );
};