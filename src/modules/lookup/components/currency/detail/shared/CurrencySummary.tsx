import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { ICurrency } from '@lookup/classes/response/currency';
import { Grid, TextField } from '@material-ui/core';
// import { currencyMessages } from '@lookup/locales/messages/currency/currencyMessages';
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
  data: ICurrency;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const currencySummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        // label={props.intl.formatMessage(currencyMessages.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...styled}
        multiline={true}
        margin="dense"
        // label={props.intl.formatMessage(currencyMessages.field.name)}
        value={props.data.name || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        // label={props.intl.formatMessage(currencyMessages.request.field.symbol)}
        value={props.data.symbol || 'N/A'}
        multiline
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(currencyMessages.request.field.date)}
        value={props.intl.formatDate(props.data.date, GlobalFormat.Date)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(currencyMessages.request.field.request)}
        value={`${props.data.currency && props.data.currency.value} ${props.intl.formatNumber(props.data.request || 0)}`}
      />
      <TextField
        {...styled}
        margin="dense"
        // label={props.intl.formatMessage(currencyMessages.request.field.advance)}
        value={`${props.data.isActive}`}
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

export const CurrencySummary = compose<AllProps, OwnProps>(
  injectIntl
)(currencySummary);