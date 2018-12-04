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
      title={props.intl.formatMessage(lookupMessage.lookupCustomer.section.infoTitle)}
      subheader={props.intl.formatMessage(lookupMessage.lookupCustomer.section.infoSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.companyUid)}
        value={props.data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.companyUid)}
        value={props.data.company ? props.data.company.name : props.data.companyUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.npwp)}
        value={props.data.npwp ? props.data.npwp : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.address)}
        value={props.data.address ? props.data.address : 'N/A'}
        multiline={true}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.addressAdditional)}
        value={props.data.addressAdditional ? props.data.addressAdditional : 'N/A'}
        multiline={true}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.phone)}
        value={props.data.phone ? props.data.phone : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.phoneAdditional)}
        value={props.data.phoneAdditional ? props.data.phoneAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.mobile)}
        value={props.data.mobile ? props.data.mobile : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.mobileAdditional)}
        value={props.data.mobileAdditional ? props.data.mobileAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.fax)}
        value={props.data.fax ? props.data.fax : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.emailAddress)}
        value={props.data.email ? props.data.email : 'N/A'}
      />
      <FormControlLabel
        control={
          <Checkbox checked={props.data.isActive} />
        }
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.isActive)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.contactPerson)}
        value={props.data.contactPerson ? props.data.contactPerson : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.contactTitle)}
        value={props.data.contactTitle ? props.data.contactTitle : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupCustomer.field.contactPersonAdditional)}
        value={props.data.contactTitleAdditional ? props.data.contactTitleAdditional : 'N/A'}
      />
    </CardContent>
  </Card>
);

export const LookupCustomerInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupcustomerInformation);