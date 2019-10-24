import { IAccountEmployee } from '@account/classes';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IAccountEmployee;
  company?: string;
}

type AllProps = OwnProps & InjectedIntlProps;

const employeeInformation: React.SFC<AllProps> = props => {
  const { data, intl, company } = props;

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
        label={intl.formatMessage(accountMessage.employee.field.uid)}
        value={data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.nik)}
        value={data.employmentNumber}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.gender)}
        value={data.gender ? data.gender.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.company)}
        value={company ? company : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.employment)}
        value={data.employment ? data.employment.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.joinDate)}
        value={intl.formatDate(data.joinDate, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.inactiveDate)}
        value={data.inactiveDate ? intl.formatDate(data.inactiveDate, GlobalFormat.Date) : 'N/A'}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const EmployeeInformation = compose<AllProps, OwnProps>(
  injectIntl
)(employeeInformation);