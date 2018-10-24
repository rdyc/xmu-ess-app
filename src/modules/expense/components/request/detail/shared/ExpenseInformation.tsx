import { IExpenseDetail } from '@expense/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  data: IExpenseDetail;
  intl: InjectedIntl;
}

export const ExpenseInformation: React.SFC<OwnProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="expense.infoTitle"/>}
        subheader={<FormattedMessage id="expense.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.uid" />}
          value={data.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.date" />}
          value={data.date ?
            intl.formatDate(data.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.createdBy" />}
          value={data.changes && data.changes.created && data.changes.created.fullName ? data.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.type" />}
          value={data.expense ? data.expense.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.project" />}
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.customer" />}
          value={data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.value" />}
          value={intl.formatNumber(data.value || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.location" />}
          value={data.location}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.address" />}
          value={data.address || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.clientName" />}
          value={data.client ? data.client.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.clientTitle" />}
          value={data.client ? data.client.title : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.notes" />}
          value={data.notes || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        {!isNullOrUndefined(data.rejectedReason) ?
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.rejectedReason" />}
          value={data.rejectedReason || 'N/A'}
        /> : ''
        }
        
      </CardContent>
    </Card>
  );

  return render;
};