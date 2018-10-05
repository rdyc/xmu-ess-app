import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DatePicker from 'material-ui-pickers/DatePicker';
import { Moment } from 'moment';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface FromFieldProps { 
  format?: string  | undefined;
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps; // & InjectedIntlProps;

export const FieldInputDate: React.SFC<AllProps> = props => {
  const { format, input, label, disabled, meta } = props;

  return (
    <DatePicker
      fullWidth
      margin="normal"
      leftArrowIcon={<ChevronLeftIcon />}
      rightArrowIcon={<ChevronRightIcon />}
      // okLabel={intl.formatMessage({id: 'global.action.ok'})}
      // cancelLabel={intl.formatMessage({id: 'global.action.cancel'})}
      // clearLabel={intl.formatMessage({id: 'global.action.clear'})}
      // todayLabel={intl.formatMessage({id: 'global.date.today'})}
      // emptyLabel={intl.formatMessage({id: 'global.date.empty'})}
      showTodayButton={true}
      format={format || 'MMM DD, YYYY'}
      {...input}
      label={label}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={(moment: Moment) => input.onChange(moment.toISOString(true))}
    />
  );
};