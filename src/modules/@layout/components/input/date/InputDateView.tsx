import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DatePicker from 'material-ui-pickers/DatePicker';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import { Moment } from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { InputDateProps } from './InputDate';

export const InputDateView: React.SFC<InputDateProps> = props => {
  const { dateFormat, input, required, label, disabled, meta, intl } = props;

  const labelFunction = (date: MaterialUiPickersDate, invalidLabel: string): string => {
    let result: string = invalidLabel;

    if (date.isValid()) {
      result = date.format('MMM DD, YYYY');
    } 

    return result;
  };

  const render = (
    <DatePicker
      fullWidth
      margin="normal"
      leftArrowIcon={<ChevronLeftIcon />}
      rightArrowIcon={<ChevronRightIcon />}
      okLabel={intl.formatMessage({id: 'global.action.ok'})}
      cancelLabel={intl.formatMessage({id: 'global.action.cancel'})}
      clearLabel={intl.formatMessage({id: 'global.action.clear'})}
      todayLabel={intl.formatMessage({id: 'global.date.today'})}
      emptyLabel={intl.formatMessage({id: 'global.date.empty'})}
      showTodayButton={true}
      format={input.value ? dateFormat || 'MMM DD, YYYY' : undefined}
      {...input}
      label={label}
      required={required}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={(moment: Moment) => input.onChange(moment.toISOString(true))}
      labelFunc={labelFunction}
      invalidLabel={''}
    />
  );

  return render;
};