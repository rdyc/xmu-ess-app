import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputDateView } from './InputDateView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputDateProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDate = compose<InputDateProps, OwnProps>(
  injectIntl
)(InputDateView);