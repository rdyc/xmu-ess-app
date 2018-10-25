import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import * as React from 'react';

import { FormattedMessage } from 'react-intl';
import { InputRadioProps } from './InputRadio';

export const InputRadioView: React.SFC<InputRadioProps> = props => {
  const { input, names, selected, setStateValue } = props;

  const value = selected;

  const changeValue = (event: any) => {
    setStateValue(event.target.value);
  };

  const renderRadio = (name: string) => {
    return (
      <FormControlLabel
        value={name}
        control={<Radio color="secondary" />}
        label={<FormattedMessage id={`global.form.approval.option.${name}`}/>}
        onClick={changeValue}
        checked={value === name}
      />
    );
  };

  const render = (
    <RadioGroup
      {...input}
      value={selected}
    >
      {names.map(name => renderRadio(name))}
    </RadioGroup>
  );

  return render;
};