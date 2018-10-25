import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { RadioGroupView } from './RadioGroupView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type RadioGroupProps 
  = OwnProps;

export const RadioGroup = compose<RadioGroupProps, OwnProps>(

)(RadioGroupView);