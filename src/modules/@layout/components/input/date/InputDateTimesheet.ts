import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { DateType } from 'material-ui-pickers/constants/prop-types';
import { InputDateTimesheetView } from './InputDateTimesheetView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean;
  minDate?: DateType;
}

export type InputDateTimesheetProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateTimesheet = compose<InputDateTimesheetProps, OwnProps>(
  injectIntl
)(InputDateTimesheetView);