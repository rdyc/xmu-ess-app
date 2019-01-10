import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DatePicker } from 'material-ui-pickers';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import * as React from 'react';
import { InputDateWithValueProps } from './InputDateWithValue';

export const InputDateWithValueView: React.SFC<InputDateWithValueProps> = props => {
  const { label, intl, future, val } = props;

  const labelFunction = (date: MaterialUiPickersDate, invalidLabel: string): string => {
    let result: string = invalidLabel;

    if (date.isValid()) {
      result = date.format('MMM DD, YYYY');
    } 

    return result;
  };

  const render = (
    props.isOpen ? 
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
      label={label}
      onChange={props.onSelected}
      labelFunc={labelFunction}
      invalidLabel={''}
      disableFuture={future}
      onClose={props.onClose}
      value={val}
    /> : null
  );

  return render;
};