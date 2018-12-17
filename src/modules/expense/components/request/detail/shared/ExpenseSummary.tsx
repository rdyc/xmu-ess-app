import { IExpense } from '@expense/classes/response';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IExpense;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const expenseSummary: React.SFC<AllProps> = props => (
    <Grid container>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.status)}
          value={props.data.status ? props.data.status.value : props.data.statusType}
        />
        {
          props.data.rejectedReason &&
          <TextField 
            {...GlobalStyle.TextField.ReadOnly}
            multiline
            label={props.intl.formatMessage(expenseMessage.request.field.rejectedReason)}
            value={props.data.rejectedReason}
          />
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.projectUid)}
          value={props.data.project ? `${props.data.project.uid} - ${props.data.project.name}` : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.customerUid)}
          value={props.data.customer ? props.data.customer.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.notes)}
          value={props.data.notes || 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.expenseType)}
          value={props.data.expense ? props.data.expense.value : props.data.expenseType}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.location)}
          value={props.data.location}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.address)}
          value={props.data.address || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.name)}
          value={props.data.client ? props.data.client.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.title)}
          value={props.data.client ? props.data.client.title : 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.date)}
          value={props.data.date ?
            props.intl.formatDate(props.data.date, GlobalFormat.Date) : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.value)}
          value={props.intl.formatNumber(props.data.value || 0, GlobalFormat.CurrencyDefault)}
        />
      </Grid>
      {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
    </Grid>
);

export const ExpenseSummary = compose<AllProps, OwnProps>(
  injectIntl
)(expenseSummary);