import { ISystemList } from '@common/classes/response';
import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';

import { SelectSystemProps } from './SelectSystem';

export const SelectSystemView: React.SFC<SelectSystemProps> = props => {
  const { width, input, required, label, placeholder, disabled, meta, onlyForTypes } = props; 
  const { response } = props.categoryState();
  
  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ? 
    <option value=""></option> : 
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: ISystemList) => {
    // don't add option when the type has been set in specific types
    if (onlyForTypes) {
      if (onlyForTypes.indexOf(item.type) === -1) {
        return null;
      }
    }

    // render as native
    if (isMobile) {
      return (
        <option key={item.id} value={item.type}>
          {item.name}
        </option>
      );
    } 

    // render as material-ui
    if (!isMobile) {
      return (
        <MenuItem key={item.id} value={item.type}>
          {item.name}
        </MenuItem>
      );
    }

    return null;
  };

  const render = (
    <TextField
      select
      fullWidth
      margin="normal"
      {...input}
      required={required}
      label={label}
      placeholder={placeholder}
      disabled={disabled || meta.submitting}
      error={meta.touched && !(meta.error === undefined || meta.error === null)}
      helperText={meta.touched && meta.error}
      SelectProps={{
        native: isMobile
      }}
    >
      {renderItemEmpty}
      {
        response &&
        response.data &&
        response.data.map(item => renderItem(item))
      }
    </TextField>
  );

  return render;
};
