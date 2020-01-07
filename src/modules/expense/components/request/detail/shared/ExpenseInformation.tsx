import { IExpenseDetail } from '@expense/classes/response';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(expenseMessage.request.section.title)}
        // subheader={props.intl.formatMessage(expenseMessage.request.section.subTitle)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.uid)}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.date)}
          value={data.date ?
            intl.formatDate(data.date, GlobalFormat.Date) : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.createdBy)}
          value={data.changes && data.changes.created && data.changes.created.fullName ? data.changes.created.fullName : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.expenseType)}
          value={data.expense ? data.expense.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.projectUid)}
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.customerUid)}
          value={data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.value)}
          value={intl.formatNumber(data.value || 0, GlobalFormat.CurrencyDefault)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.location)}
          value={data.location}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.address)}
          value={data.address || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.name)}
          value={data.client ? data.client.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.title)}
          value={data.client ? data.client.title : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(expenseMessage.request.field.notes)}
          value={data.notes || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(expenseMessage.request.field.status)}
          value={data.status ? data.status.value : 'N/A'}
        />
        {
          !isNullOrUndefined(data.rejectedReason) ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(expenseMessage.request.field.rejectedReason)}
            value={data.rejectedReason || 'N/A'}
          /> : ''
        }
        {
          data.changes &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.createdBy)}
            value={data.changes.created && data.changes.created.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
        {
          data.changes &&
          (data.changes.updated && data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const ExpenseInformation = compose<AllProps, OwnProps>(
  injectIntl
)(expenseInformation);