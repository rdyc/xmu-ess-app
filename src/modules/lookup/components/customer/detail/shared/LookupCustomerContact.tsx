import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICustomer } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ICustomer;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupcustomerContact: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(lookupMessage.customer.section.contactTitle)}
      // subheader={props.intl.formatMessage(lookupMessage.lookupCustomer.section.infoSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.phone)}
        value={props.data.phone ? props.data.phone : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.phoneAdditional)}
        value={props.data.phoneAdditional ? props.data.phoneAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.mobile)}
        value={props.data.mobile ? props.data.mobile : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.mobileAdditional)}
        value={props.data.mobileAdditional ? props.data.mobileAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.fax)}
        value={props.data.fax ? props.data.fax : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.emailAddress)}
        value={props.data.email ? props.data.email : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.contactPerson)}
        value={props.data.contactPerson ? props.data.contactPerson : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.contactTitle)}
        value={props.data.contactTitle ? props.data.contactTitle : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.contactPersonAdditional)}
        value={props.data.contactPersonAdditional ? props.data.contactPersonAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.contactTitleAdditional)}
        value={props.data.contactTitleAdditional ? props.data.contactTitleAdditional : 'N/A'}
      />
    </CardContent>
  </Card>
);

export const LookupCustomerContact = compose<AllProps, OwnProps>(
  injectIntl
)(lookupcustomerContact);