import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import * as React from 'react';

import { RadioGroupProps } from './RadioGroup';

export const RadioGroupView: React.SFC<RadioGroupProps> = props => {
  const { input, required, label, disabled, meta, choices } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" required={required}>{label}</FormLabel>
      <RadioGroup {...input}>
        {
          choices &&
          choices.map(item => 
            <FormControlLabel
              key={item.value}
              value={item.value} 
              label={item.label}
              control={
                <Radio 
                  disabled={disabled || meta.submitting}
                /> 
              } 
            />
          )
        }
      </RadioGroup>
    </FormControl>
  );
};