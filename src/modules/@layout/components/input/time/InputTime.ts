import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputTimeView } from './InputTimeView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  // dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputTimeProps 
  = OwnProps
  & InjectedIntlProps;

export const InputTime = compose<InputTimeProps, OwnProps>(
  injectIntl
)(InputTimeView);