import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DatePicker from 'material-ui-pickers/DatePicker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

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
    okLabel={<FormattedMessage id="global.action.ok" />}
    cancelLabel={<FormattedMessage id="global.action.cancel" />}
    clearLabel={<FormattedMessage id="global.action.clear" />}
    todayLabel={<FormattedMessage id="global.date.today" />}
    emptyLabel={<FormattedMessage id="global.date.empty" />}
    {...input}
    label={label}
    disabled={disabled || submitting}
    error={touched && error}
    helperText={touched && error}
  />
);