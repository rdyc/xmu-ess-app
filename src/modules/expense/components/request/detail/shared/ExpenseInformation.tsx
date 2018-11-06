import { IExpenseDetail } from '@expense/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  data: IExpenseDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const expenseInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="expense.infoTitle"/>}
        subheader={<FormattedMessage id="expense.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.uid" />}
          value={data.uid}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.date" />}
          value={data.date ?
            intl.formatDate(data.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.createdBy" />}
          value={data.changes && data.changes.created && data.changes.created.fullName ? data.changes.created.fullName : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.type" />}
          value={data.expense ? data.expense.value : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.project" />}
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.customer" />}
          value={data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.value" />}
          value={intl.formatNumber(data.value || 0)}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.location" />}
          value={data.location}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.address" />}
          value={data.address || 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.clientName" />}
          value={data.client ? data.client.name : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.clientTitle" />}
          value={data.client ? data.client.title : 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.notes" />}
          value={data.notes || 'N/A'}
        />
        <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        {!isNullOrUndefined(data.rejectedReason) ?
          <TextField
          {...styled}
          fullWidth
          contentEditable={false}
          margin="dense"
          label={<FormattedMessage id="expense.field.rejectedReason" />}
          value={data.rejectedReason || 'N/A'}
        /> : ''
        }
        
      </CardContent>
    </Card>
  );

  return render;
};

export const ExpenseInformation = compose<AllProps, OwnProps>(
  injectIntl
)(expenseInformation);