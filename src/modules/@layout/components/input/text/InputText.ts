import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputTextView } from './InputTextView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string; 
  label: string; 
  disabled: boolean; 
}

export type InputTextProps 
  = OwnProps;

export const InputText = compose<InputTextProps, OwnProps>(

)(InputTextView);