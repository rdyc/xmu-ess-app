import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputLookupNumberView } from './InputLookupNumberView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string;
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean; 
}

export type InputLookupNumberProps 
  = OwnProps;

export const InputLookupNumber = compose<InputLookupNumberProps, OwnProps>(
  // nothing
)(InputLookupNumberView);