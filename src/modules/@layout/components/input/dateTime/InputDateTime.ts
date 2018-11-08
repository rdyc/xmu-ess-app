import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputDateTimeView } from './InputDateTimeView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputDateTimeProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateTime = compose<InputDateTimeProps, OwnProps>(
  injectIntl
)(InputDateTimeView);