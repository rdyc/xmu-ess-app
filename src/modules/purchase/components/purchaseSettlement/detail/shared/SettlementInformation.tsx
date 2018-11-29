import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ISettlementDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const settlementInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square >
    <CardHeader 
        title={intl.formatMessage(purchaseMessage.settlement.section.infoTitle)}
        subheader={intl.formatMessage(purchaseMessage.settlement.section.infoSubHeader)}
        />
        <CardContent >
          { data.statusType ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={intl.formatMessage(purchaseMessage.settlement.field.status)}
            value={data.status ? data.status.value : ''}
          />
            : '' }
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.uid)}
          value = { data.uid }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.createdBy)}
          value={data.changes && data.changes.created && data.changes.created.fullName || 'N/A' }
          multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.customerUid)}
          value = { data.customer && data.customer.name || 'N/A' }
          multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.projectUid)}
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A' }
          multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.notes)}
          value = { data.notes || 'N/A' }
          multiline
          />
          { data.date ?
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
            label={intl.formatMessage(purchaseMessage.settlement.field.date)}
          value = {
            intl.formatDate(data.date, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }
          />
          : ''}
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.currencyType)}
          value={data.currency ? `${data.currency.value} : ${ intl.formatNumber(data.rate || 0) }` : 'N/A' }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.request)}
          value = { intl.formatNumber(data.request || 0) }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.actual)}
          value = { intl.formatNumber(data.actual || 0) }
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.difference)}
          value = { intl.formatNumber(data.difference || 0) }
          />
          { data.currencyType !== 'SCR01' ?
          <TextField
            { ...GlobalStyle.TextField.ReadOnly }
            margin = "dense"
            label={intl.formatMessage(purchaseMessage.settlement.field.requestInIDR)}
            value = { intl.formatNumber(data.requestInIDR || 0) }
            multiline
          />
          : '' }
          { data.currencyType !== 'SCR01' ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={intl.formatMessage(purchaseMessage.settlement.field.actualInIDR)}
            value={intl.formatNumber(data.actualInIDR || 0)}
            multiline
          />
          : '' }
          {data.currencyType !== 'SCR01' ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={intl.formatMessage(purchaseMessage.settlement.field.differenceInIDR)}
            value={intl.formatNumber(data.differenceInIDR || 0)}
          />
          : '' }
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
            margin = "dense"
            label={intl.formatMessage(purchaseMessage.settlement.field.advance)}
            value = { intl.formatNumber(data.advance || 0) }
            multiline
          />
          <TextField
          { ...GlobalStyle.TextField.ReadOnly }
          margin = "dense"
          label={intl.formatMessage(purchaseMessage.settlement.field.balanceDue)}
          value = { intl.formatNumber(data.balanceDue || 0) }
          />
          </CardContent>
          </Card>
          );
  return render;
};

export const SettlementInformation = compose<AllProps, OwnProps>(
  injectIntl
)(settlementInformation);
