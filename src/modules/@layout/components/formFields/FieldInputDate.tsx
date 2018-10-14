import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DatePicker from 'material-ui-pickers/DatePicker';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import { Moment } from 'moment';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface FromFieldProps { 
  format?: string | undefined;
  type?: string; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps; // & InjectedIntlProps;

export const FieldInputDate: React.SFC<AllProps> = props => {
  const { format, input, label, disabled, meta } = props;

  const labelFunction = (date: MaterialUiPickersDate, invalidLabel: string): string => {
    let result: string = invalidLabel;

    if (date.isValid()) {
      result = date.format('MMM DD, YYYY');
    } 

    return result;
  };

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
      format={input.value ? format || 'MMM DD, YYYY' : undefined}
      {...input}
      label={label}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={(moment: Moment) => input.onChange(moment.toISOString(true))}
      labelFunc={labelFunction}
      invalidLabel={''}
    />
  );
};