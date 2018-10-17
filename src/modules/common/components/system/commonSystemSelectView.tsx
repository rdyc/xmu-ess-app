import { ISystemList } from '@common/classes/response';
import { CommonSystemSelectProps } from '@common/components/system/CommonSystemSelect';
import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

export const CommonSystemSelectView: React.SFC<CommonSystemSelectProps> = props => {
  const { width, input, label, placeholder, disabled, meta } = props;
  const { response } = props.categoryState();
  
  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ? 
    <option value=""></option> : 
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: ISystemList) => {
    if (isMobile) {
      return (
        <option key={item.id} value={item.type}>
          {item.name}
        </option>
      );
    } 

    if (!isMobile) {
      return (
        <MenuItem key={item.id} value={item.type}>
          {item.name}
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
      name={`select${input.name}`}
      label={label}
      placeholder={placeholder}
      value={input.value}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      SelectProps={{
        native: isMobile
      }}
      onChange={props.handleChange}
    >
      {renderItemEmpty}
      {
        response &&
        response.data &&
        response.data.map(item => renderItem(item))
      }
    </TextField>
  );
};