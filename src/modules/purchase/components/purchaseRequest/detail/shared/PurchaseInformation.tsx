import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPurchaseDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const purchaseInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const render = (
    <Card square >
    <CardHeader 
        title= {< FormattedMessage id = "purchase.infoTitle" />}
        subheader = {< FormattedMessage id = "purchase.infoSubTitle" />}
        />
        <CardContent >
          <TextField
          { ...styled }
          margin = "dense"
          label = {< FormattedMessage id = "purchase.field.information.status" />}
          value = { data.status ? data.status.value : data.statusType }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = {< FormattedMessage id = "purchase.field.information.uid" />}
          value = { data.uid }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = {< FormattedMessage id = "purchase.field.information.createdBy" />}
          value={ data.changes.created ? data.changes.created.fullName : 'N/A' }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = {< FormattedMessage id = "purchase.field.information.customerUid" /> }
          value = { data.customer ? data.customer.name : 'N/A' }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = {< FormattedMessage id = "purchase.field.information.projectUid" /> }
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A' }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.notes" />  }
          value = { data.notes || 'N/A' }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.date" /> }
          value = {
            intl.formatDate(data.date, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.currencyType" /> }
          value = { data.currency ? data.currency.value : 'N/A' }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.rate" /> }
          value = { intl.formatNumber(data.rate || 0) }
          /><TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.request" /> }
          value = { intl.formatNumber(data.request) }
          />
          { data.currencyType === 'SCR01' ?
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.requestIDR" /> }
          value = { intl.formatNumber(data.requestIDR || 0) }
          />
          : '' }
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.advance" /> }
          value = { intl.formatNumber(data.advance) }
          />
          </CardContent>
          </Card>
          );
  return render;
};

export const PurchaseInformation = compose<AllProps, OwnProps>(
  injectIntl
)(purchaseInformation);
