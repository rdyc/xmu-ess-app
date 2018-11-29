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

const lookupDiemInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(lookupMessage.LookupCustomer.section.infoTitle)}
      subheader={props.intl.formatMessage(lookupMessage.LookupCustomer.section.infoSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.company)}
        value={props.data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.company)}
        value={props.data.company ? props.data.company.name : props.data.companyUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.npwp)}
        value={props.data.npwp ? props.data.npwp : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.address)}
        value={props.data.address ? props.data.address : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.addressAdditional)}
        value={props.data.addressAdditional ? props.data.addressAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.phone)}
        value={props.data.phone ? props.data.phone : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.phoneAdditional)}
        value={props.data.phoneAdditional ? props.data.phoneAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.mobile)}
        value={props.data.mobile ? props.data.mobile : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.mobileAdditional)}
        value={props.data.mobileAdditional ? props.data.mobileAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.fax)}
        value={props.data.fax ? props.data.fax : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.email)}
        value={props.data.email ? props.data.email : 'N/A'}
      />
      <FormControlLabel
        control={
          <Checkbox checked={props.data.isActive} />
        }
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.isActive)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.contactPerson)}
        value={props.data.contactPerson ? props.data.contactPerson : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.contactTitle)}
        value={props.data.contactTitle ? props.data.contactTitle : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.LookupCustomer.field.contactPersonAdditional)}
        value={props.data.contactTitleAdditional ? props.data.contactTitleAdditional : 'N/A'}
      />
    </CardContent>
  </Card>
);

export const LookupDiemInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupDiemInformation);