import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import * as React from 'react';

import { RadioGroupProps } from './RadioGroup';

export const RadioGroupView: React.SFC<RadioGroupProps> = props => {
  const { input, required, label, disabled, meta } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" required={required}>{label}</FormLabel>
      <RadioGroup {...input}>
        <FormControlLabel value="true" control={<Radio disabled={disabled || meta.submitting} /> } label="Approved" />
        <FormControlLabel value="false" control={<Radio disabled={disabled || meta.submitting}/>} label="Rejected" />
      </RadioGroup>
    </FormControl>
  );
};