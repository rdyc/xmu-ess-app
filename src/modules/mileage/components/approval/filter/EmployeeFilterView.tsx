import { MenuItem, TextField } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { IMileageRequest } from '@mileage/classes/response';
import { EmployeeFilterProps } from './EmployeeFilter';

export const EmployeeFilterView: React.SFC<EmployeeFilterProps> = props => {
  const { width, input, required, label, placeholder, disabled, meta } = props;
  const { response } = props.mileageApprovalState.all;
  const employee: string[] = [];

  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ?
    <option value=""></option> :
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: IMileageRequest) => {
    if (employee.indexOf(item.employeeUid) === -1) {
      employee.push(item.employeeUid);

      if (isMobile) {
        return (
          <option key={item.employeeUid} value={item.employeeUid}>
            {item.employee && item.employee.fullName}
          </option>
        );
      }
  
      if (!isMobile) {
        return (
          <MenuItem key={item.employeeUid} value={item.employeeUid}>
            {item.employee && item.employee.fullName}
          </MenuItem>
        );
      }
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