import { WorkflowStatusType } from '@common/classes/types';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPurchaseDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const purchaseInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square >
    <CardHeader 
        title={intl.formatMessage(purchaseMessage.request.section.infoTitle)}
        // subheader={intl.formatMessage(purchaseMessage.request.section.infoSubHeader)}
        />
        <CardContent >
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(purchaseMessage.request.field.uid)}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(purchaseMessage.request.field.notes)}
          value={data.notes || 'N/A'}
          multiline
        />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          // label = {< FormattedMessage id = "purchase.field.information.status" />}
          label = { intl.formatMessage(purchaseMessage.request.field.status) }
          value = { data.status ? data.status.value : data.statusType }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.createdBy)}
          value={ data.changes && data.changes.created ? data.changes.created.fullName : 'N/A' }
          multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.customerUid)}
          value = { data.customer ? data.customer.name : 'N/A' }
          multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.projectUid)}
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A' }
          multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.date)}
          value = {
            intl.formatDate(data.date, GlobalFormat.Date)
          }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.currencyType)}
          value = { data.currency ? data.currency.value : 'N/A' }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.rate)}
          value = { intl.formatNumber(data.rate || 0) }
          /><TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.request)}
          value = { intl.formatNumber(data.request || 0) }
          />
          { data.currencyType !== 'SCR01' ?
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
            label={intl.formatMessage(purchaseMessage.request.field.requestInIDR)}
          value = { intl.formatNumber(data.requestIDR || 0) }
          />
          : '' }
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.request.field.advance)}
          value = { intl.formatNumber(data.advance || 0) }
          />
          {
            data.reason &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={intl.formatMessage(data.statusType === WorkflowStatusType.Rejected ? purchaseMessage.request.field.reason : purchaseMessage.request.field.approveNotes)}
            value={data.reason || 'N/A'}
            multiline
          />
          }
          {
          data.changes &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={intl.formatMessage(layoutMessage.field.createdBy)}
            value={data.changes.created && data.changes.created.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
          />
          }
          { data.changes && 
            data.changes.updated && 
            data.changes.updatedAt &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
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

export const PurchaseInformation = compose<AllProps, OwnProps>(
  injectIntl
)(purchaseInformation);
