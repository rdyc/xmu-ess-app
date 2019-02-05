import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICustomer } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ICustomer;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const summaryView: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.name)}
        value={props.data.name || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.companyUid)}
        value={props.data.company ? props.data.company.name : 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.emailAddress)}
        value={props.data.email || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.phone)}
        value={props.data.phone || 'N/A'}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
    <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.npwp)}
        value={props.data.npwp || 'N/A'}
      />      
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(lookupMessage.customer.field.address)}
        value={props.data.address || 'N/A'}
      />
    </Grid>    
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const LookupCustomerSummary = compose<AllProps, OwnProps>(
  injectIntl
)(summaryView);