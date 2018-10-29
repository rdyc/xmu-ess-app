import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { RadioGroupView } from './RadioGroupView';

export interface RadioGroupChoice {
  value: string;
  label: string;
}

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  required?: boolean;
  label: string; 
  disabled: boolean; 
  choices: RadioGroupChoice[];
}

export type RadioGroupProps 
  = OwnProps;

export const RadioGroup = compose<RadioGroupProps, OwnProps>(

)(RadioGroupView);