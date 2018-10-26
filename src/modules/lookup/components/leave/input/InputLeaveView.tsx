import { TextField } from '@material-ui/core';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { LookupLeaveDialog } from '../dialog';
import { InputLeaveProps } from './InputLeave';

export const InputLeaveView: React.SFC<InputLeaveProps> = props => {
  const { 
    input, required, disabled, label, meta, isOpen, getValueName, 
    handleDialogClose, handleDialogOpen, handleSelected
  } = props;
  const { user } = props.userState;

  const value = getValueName();

  return ( 
    <React.Fragment>
      <TextField
        fullWidth
        margin="normal"
        name={input.name}
        label={label}
        value={value}
        required={required}
        disabled={disabled || meta.submitting}
        error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
        helperText={meta.touched && meta.error}
        onClick={() => handleDialogOpen()}
      />
      <LookupLeaveDialog
        isOpen={isOpen}
        onSelected={handleSelected}
        onClose={handleDialogClose}
        filter={{
          companyUid: user && user.company.uid
        }}
      />
    </React.Fragment>   
  );
};