import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ISettlementDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const settlementInformation: React.SFC<AllProps> = props => {
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
        title= {< FormattedMessage id = "purchasesettlement.infoTitle" />}
        subheader={< FormattedMessage id= "purchasesettlement.infoSubTitle" />}
        />
        <CardContent >
          { data.statusType ?
          <TextField
            {...styled}
            margin="dense"
            label={< FormattedMessage id="purchase.field.information.status" />}
            value={data.status ? data.status.value : ''}
          />
            : < FormattedMessage id="purchase.list.readySettle" /> }
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
          { data.date ?
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.settlementdate" /> }
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
          { ...styled }
          margin = "dense"
          label={ < FormattedMessage id="purchase.field.information.currencyType" /> }
          value={data.currency ? `${data.currency.value} - ${ intl.formatNumber(data.rate || 0) }` : 'N/A' }
          />
          {/* <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.rate" /> }
          value = { intl.formatNumber(data.rate || 0) }
          /> */}
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.request" /> }
          value = { intl.formatNumber(data.request) }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label={< FormattedMessage id= "purchase.field.information.actual" /> }
          value = { intl.formatNumber(data.actual) }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label={< FormattedMessage id= "purchase.field.information.difference" /> }
          value = { intl.formatNumber(data.difference) }
          />
          
          { data.currencyType !== 'SCR01' ?
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.requestInIDR" /> }
          value = { intl.formatNumber(data.requestInIDR || 0) }
          />
          : ''}
          { data.currencyType !== 'SCR01' ?
          <TextField
            {...styled}
            margin="dense"
            label={< FormattedMessage id="purchase.field.information.actualInIDR" />}
            value={intl.formatNumber(data.actualInIDR || 0)}
          />
          : ''}
          {data.currencyType !== 'SCR01' ?
          <TextField
            {...styled}
            margin="dense"
            label={< FormattedMessage id="purchase.field.information.differenceInIDR" />}
            value={intl.formatNumber(data.differenceInIDR || 0)}
          />
          : ''}
          <TextField
          { ...styled }
          margin = "dense"
          label = { < FormattedMessage id = "purchase.field.information.advance" /> }
          value = { intl.formatNumber(data.advance) }
          />
          <TextField
          { ...styled }
          margin = "dense"
          label={< FormattedMessage id= "purchase.field.information.balanceDue" /> }
          value = { intl.formatNumber(data.balanceDue) }
          />
          </CardContent>
          </Card>
          );
  return render;
};

export const SettlementInformation = compose<AllProps, OwnProps>(
  injectIntl
)(settlementInformation);
