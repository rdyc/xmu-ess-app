import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputNumberView } from './InputNumberView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string;
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean; 
}

export type InputNumberProps 
  = OwnProps;

export const InputNumber = compose<InputNumberProps, OwnProps>(
  // nothing
)(InputNumberView);