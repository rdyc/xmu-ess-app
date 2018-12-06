import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputDateWithValueView } from './InputDateWithValueView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean;
  future?: boolean;
  val: string;
}

export type InputDateWithValueProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateWithValue = compose<InputDateWithValueProps, OwnProps>(
  injectIntl
)(InputDateWithValueView);