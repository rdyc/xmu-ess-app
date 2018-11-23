import { TextField } from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import DatePicker from 'material-ui-pickers/DatePicker';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  val: string;
  handleChange: (start: string) => void;
  disableFuture: boolean;
  label: string;
}

type AllProps = OwnProps & InjectedIntlProps;

const billableDate: React.SFC<AllProps> = props => {
  const { val, handleChange, intl, disableFuture, label } = props;

  const renderDate = () => (
    <DatePicker
      okLabel={intl.formatMessage({ id: 'global.action.ok' })}
      cancelLabel={intl.formatMessage({ id: 'global.action.cancel' })}
      clearLabel={intl.formatMessage({ id: 'global.action.clear' })}
      todayLabel={intl.formatMessage({ id: 'global.date.today' })}
      emptyLabel={intl.formatMessage({ id: 'global.date.empty' })}
      leftArrowIcon={<ChevronLeft />}
      rightArrowIcon={<ChevronRight />}
      format={'MMM DD, YYYY'}
      label={label}
      showTodayButton
      disableFuture={disableFuture}
      value={val}
      onChange={(moment: Moment) => handleChange(moment.toISOString(true))}
    />
  );
  
  const render = (
    <TextField 
      margin="normal"
      InputProps={{
        inputComponent: renderDate
      }}
    />
  );

  return render;
};

export const BillableDate = compose<AllProps, OwnProps>(injectIntl)(billableDate);