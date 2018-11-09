import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputDateTimesheetView } from './InputDateTimesheetView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

export type InputDateTimesheetProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateTimesheet = compose<InputDateTimesheetProps, OwnProps>(
  injectIntl
)(InputDateTimesheetView);