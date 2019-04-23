import { IEmployeeDetail } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const accountEmployeeContact: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
    <CardHeader
      title={intl.formatMessage(accountMessage.employee.field.contactTitle)}
      subheader={intl.formatMessage(accountMessage.employee.field.contactSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.phone)}
        value={data.phone ? data.phone : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.mobile)}
        value={data.mobilePhone ? data.mobilePhone : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.companyEmail)}
        value={data.email}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.email)}
        value={data.emailPersonal ? data.emailPersonal : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        multiline={true}
        label={intl.formatMessage(accountMessage.employee.field.addressKtp)}
        value={data.address ? data.address : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        multiline={true}
        label={intl.formatMessage(accountMessage.employee.field.addressNpwp)}
        value={data.addressAdditional ? data.addressAdditional : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.emergencyName)}
        value={data.contact && data.contact.name ? data.contact.name : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.emergencyRelation)}
        value={data.contact && data.contact.relation ? data.contact.relation : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.emergencyPhone1)}
        value={data.contact && data.contact.phone ? data.contact.phone : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.emergencyPhone2)}
        value={data.contact && data.contact.phoneAdditional ? data.contact.phoneAdditional : 'N/A'}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const AccountEmployeeContact = compose<AllProps, OwnProps>(
  injectIntl
)(accountEmployeeContact);