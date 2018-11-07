import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputContactNumberView } from './InputContactNumberView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string;
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean; 
}

export type InputContactNumberProps 
  = OwnProps;

export const InputContactNumber = compose<InputContactNumberProps, OwnProps>(
  // nothing
)(InputContactNumberView);