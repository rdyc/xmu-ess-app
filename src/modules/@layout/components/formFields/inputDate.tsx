import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DatePicker from 'material-ui-pickers/DatePicker';
import { Moment } from 'moment';
import * as React from 'react';

export const inputDate = ({ 
  input, 
  label, 
  disabled, 
  required, 
  meta: { 
    touched, 
    error, 
    warning,
    submitting
  }
}: any) => (
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
    format={'MMM DD, YYYY'}
    {...input}
    label={label}
    disabled={disabled || submitting}
    error={touched && error}
    helperText={touched && error}
    onChange={(moment: Moment) => input.onChange(moment.toISOString(true))}
  />
);

// export default injectIntl(inputDate);