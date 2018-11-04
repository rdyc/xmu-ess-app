import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { IProjectSite } from '@project/classes/response';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { SelectProjectSiteProps } from './SelectProjectSite';

export const SelectProjectSiteView: React.SFC<SelectProjectSiteProps> = props => {
  const { width, input, required, label, placeholder, disabled, meta, handleOnChange } = props; 
  const { response } = props.projectSiteState;
  
  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ? 
    <option value=""></option> : 
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: IProjectSite) => {
    // render as native
    if (isMobile) {
      return (
        <option key={item.uid} value={item.uid}>
          {item.uid} - {item.name}
        </option>
      );
    } 

    // render as material-ui
    if (!isMobile) {
      return (
        <MenuItem key={item.uid} value={item.uid}>
          {item.uid} - {item.name}
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
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      SelectProps={{
        native: isMobile
      }}
      onChange={handleOnChange}
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