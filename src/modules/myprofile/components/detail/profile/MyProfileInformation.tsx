import { IEmployeeMy } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeMy;
}

type AllProps = OwnProps & InjectedIntlProps;

const myProfileInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
    <CardHeader
      title={intl.formatMessage(accountMessage.employee.field.title)}
      subheader={intl.formatMessage(accountMessage.employee.field.subHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.nik)}
        value={data.employmentNumber}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.name)}
        value={data.fullName}
      />
      {/* <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.gender)}
        value={data.gender ? data.gender.value : 'N/A'}
      /> */}
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.birthPlace)}
        value={data.birthPlace ? data.birthPlace : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.birthDate)}
        value={data.dateOfBirth ? intl.formatDate(data.dateOfBirth, GlobalFormat.Date) : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.company)}
        value={data.company ? data.company.name : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.employment)}
        value={data.employment ? data.employment.value : 'N/A'}
      />
      {/* <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.ptkp)}
        value={data.tax ? data.tax.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.blood)}
        value={data.blood ? data.blood.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.religion)}
        value={data.religion ? data.religion.value : 'N/A'}
      /> */}
    </CardContent>
  </Card>
  );

  return render;
};

export const MyProfileInformation = compose<AllProps, OwnProps>(
  injectIntl
)(myProfileInformation);