import { ICompanyList } from '@lookup/classes/response/company';
import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { SelectLookupCompanyProps } from './SelectLookupCompany';

export const SelectLookupCompanyView: React.SFC<SelectLookupCompanyProps> = props => {
  const { width, input, required, label, placeholder, disabled, meta, handleOnChange } = props;
  const { isLoading, response } = props.lookupCompanyState.list;

  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ?
    <option value=""></option> :
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: ICompanyList) => {
    // render as native
    if (isMobile) {
      return (
        <option key={item.uid} value={item.uid}>
          {item.name}
        </option>
      );
    }

    // render as material-ui
    if (!isMobile) {
      return (
        <MenuItem key={item.uid} value={item.uid}>
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
      onChange={handleOnChange}
    >
      {renderItemEmpty}
      {
        !isLoading &&
        response &&
        response.data &&
        response.data.map(item => renderItem(item))
      }
    </TextField>
  );

  return render;
};