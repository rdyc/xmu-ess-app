import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputEmployeeView } from './InputEmployeeView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputEmployeeProps 
  = OwnProps
  & WithAccountEmployee;

export const InputEmployee = compose<InputEmployeeProps, OwnProps>(
  withAccountEmployee
)(InputEmployeeView);