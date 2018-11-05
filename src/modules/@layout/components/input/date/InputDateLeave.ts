import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputDateLeaveView } from './InputDateLeaveView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputDateLeaveProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateLeave = compose<InputDateLeaveProps, OwnProps>(
  injectIntl
)(InputDateLeaveView);