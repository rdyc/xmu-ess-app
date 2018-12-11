import { DateType } from 'material-ui-pickers/constants/prop-types';
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
  disablePast?: boolean;
  disableFuture?: boolean; 
  minDate?: DateType;
  maxDate?: DateType;
}

export type InputDateProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDate = compose<InputDateProps, OwnProps>(
  injectIntl
)(InputDateView);