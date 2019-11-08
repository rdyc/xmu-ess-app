import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICustomer } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ICustomer;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupcustomerInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(lookupMessage.customer.section.infoTitle)}
      // subheader={props.intl.formatMessage(lookupMessage.lookupCustomer.section.infoSubHeader)}
    />
    <CardContent>
    <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.companyUid)}
        value={props.data.company ? props.data.company.name : props.data.companyUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.name)}
        value={props.data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.npwp)}
        value={props.data.npwp ? props.data.npwp : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.address)}
        value={props.data.address ? props.data.address : 'N/A'}
        multiline={true}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.customer.field.addressAdditional)}
        value={props.data.addressAdditional ? props.data.addressAdditional : 'N/A'}
        multiline={true}
      />
      <FormControlLabel
        control={
          <Checkbox checked={props.data.isActive} />
        }
        label={props.intl.formatMessage(lookupMessage.customer.field.isActive)}
      />
    </CardContent>
  </Card>
);

export const LookupCustomerInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupcustomerInformation);