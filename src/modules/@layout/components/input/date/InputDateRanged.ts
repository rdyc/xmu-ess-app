import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { InputDateRangedView } from './InputDateRangedView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean; 
  minDate?: string | undefined;
  maxDate?: string | undefined;
}

export type InputDateRangedProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateRanged = compose<InputDateRangedProps, OwnProps>(
  injectIntl
)(InputDateRangedView);