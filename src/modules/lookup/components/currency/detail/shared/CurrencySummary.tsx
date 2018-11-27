import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICurrency } from '@lookup/classes/response/currency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ICurrency;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const currencySummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.currency.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.currency.field.name)}
        value={props.data.name || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.currency.field.symbol)}
        value={props.data.symbol || 'N/A'}
        multiline
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.currency.field.rate)}
        value={props.data.rate || 0}
        multiline
      />
      <FormControlLabel
        control={ <Checkbox checked={props.data.isActive} /> }
        label={props.data.isActive ?
          props.intl.formatMessage(lookupMessage.currency.field.isActive) :
          props.intl.formatMessage(lookupMessage.currency.field.isNotActive)}
        />
    </Grid>

    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
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