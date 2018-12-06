import { SelectEmployee } from '@account/components/select';
import { InputDateWithValue } from '@layout/components/input/date';
import { Grid, TextField } from '@material-ui/core';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { Field } from 'redux-form';
import { BillableFilterFormProps } from './BillableFilterForm';

export const BillableFilterFormView: React.SFC<
  BillableFilterFormProps
> = props => {
  const {
    handleChangeEmployee,
    handleChangeStart,
    handleChangeEnd
  } = props;

  return (
    <form>
      <Grid container spacing={16}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(summaryMessage.billable.field.company)}
            value={props.userState.user && props.userState.user.company.name}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <Field
            type="text"
            name="employeeUid"
            label={props.intl.formatMessage(summaryMessage.billable.field.name)}
            placeholder={props.intl.formatMessage(summaryMessage.billable.field.name)}
            component={SelectEmployee}
            companyUids={
              props.userState.user && [props.userState.user.company.uid]
            }
            onChange={handleChangeEmployee}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <Field
            name="start"
            label={props.intl.formatMessage(summaryMessage.billable.field.start)}
            placeholder={props.intl.formatMessage(summaryMessage.billable.field.start)}
            component={InputDateWithValue}
            onChange={handleChangeStart}
            future={true}
            val={props.startValue ? props.startValue : props.start}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <Field
            name="end"
            label={props.intl.formatMessage(summaryMessage.billable.field.end)}
            placeholder={props.intl.formatMessage(summaryMessage.billable.field.end)}
            component={InputDateWithValue}
            onChange={handleChangeEnd}
            future={true}
            val={props.endValue ? props.endValue : props.end}
          />
        </Grid>
      </Grid>
    </form>
  );
};
