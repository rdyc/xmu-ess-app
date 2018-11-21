import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Grid, TextField } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
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
  data: IPurchase;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const purchaseSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.status)}
        value={props.data.status ? props.data.status.value : 'N/A'}
      />
      { props.data.reason ?
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.reason)}
        value={props.data.reason || 'N/A'}
      />
      : '' }
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.uid)}
        value={props.data.uid}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.customerUid)}
        value={props.data.customer ? props.data.customer.name : 'N/A'}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.projectUid)}
        value={props.data.projectUid || 'N/A'}
      />
      <TextField
        {...styled}
        margin="dense"
        value={props.data.project && props.data.project.name || 'N/A'}
      />
      <TextField
        {...styled}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.notes)}
        value={props.data.notes || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.date)}
        value={props.intl.formatDate(props.data.date, GlobalFormat.Date)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.request)}
        value= {`${props.data.currency && props.data.currency.value} ${props.intl.formatNumber(props.data.request || 0)}`}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.request.field.advance)}
        value={`${props.data.currency && props.data.currency.value} ${props.intl.formatNumber(props.data.advance || 0)}`}
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

export const PurchaseSummary = compose<AllProps, OwnProps>(
  injectIntl
)(purchaseSummary);