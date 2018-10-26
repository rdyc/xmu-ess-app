import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputTextAreaView } from './InputTextAreaView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputTextAreaProps 
  = OwnProps;

export const InputTextArea = compose<InputTextAreaProps, OwnProps>(

)(InputTextAreaView);