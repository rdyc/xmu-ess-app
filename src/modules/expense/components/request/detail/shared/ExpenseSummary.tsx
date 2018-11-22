import { IExpense } from '@expense/classes/response';
import { expenseMessages } from '@expense/locales/messages/expenseMessages';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

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
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.status)}
          value={props.data.status ? props.data.status.value : props.data.statusType}
        />
        {
          props.data.rejectedReason &&
          <TextField 
            {...styled}
            margin="dense"
            multiline
            label={props.intl.formatMessage(expenseMessages.request.field.rejectedReason)}
            value={props.data.rejectedReason}
          />
        }
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.projectUid)}
          value={props.data.project ? `${props.data.project.uid} - ${props.data.project.name}` : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.customerUid)}
          value={props.data.customer ? props.data.customer.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          multiline
          label={props.intl.formatMessage(expenseMessages.request.field.notes)}
          value={props.data.notes || 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.expenseType)}
          value={props.data.expense ? props.data.expense.value : props.data.expenseType}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.location)}
          value={props.data.location}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.address)}
          value={props.data.address || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.name)}
          value={props.data.client ? props.data.client.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.title)}
          value={props.data.client ? props.data.client.title : 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.date)}
          value={props.data.date ?
            props.intl.formatDate(props.data.date, GlobalFormat.Date) : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(expenseMessages.request.field.value)}
          value={props.intl.formatNumber(props.data.value || 0)}
        />
      </Grid>
      {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...styled}
            margin="dense"
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