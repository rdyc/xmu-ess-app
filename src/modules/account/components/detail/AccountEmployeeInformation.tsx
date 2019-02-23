import { IEmployeeDetail } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const accountEmployeeInformation: React.SFC<AllProps> = props => {
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
        label={intl.formatMessage(accountMessage.employee.field.name)}
        value={data.fullName}
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
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.rate)}
        value={'RATE'}
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
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.gender)}
        value={data.gender ? data.gender.value : 'N/A'}
      />
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
        label={intl.formatMessage(accountMessage.employee.field.blood)}
        value={data.blood ? data.blood.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.ktp)}
        value={data.citizenNumber ? data.citizenNumber : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.npwp)}
        value={data.taxNumber ? data.taxNumber : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.ptkp)}
        value={data.tax ? data.tax.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.kartuKeluarga)}
        value={data.familyCardNumber ? data.familyCardNumber : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.bpjsKetenagakerjaan)}
        value={data.bpjsEmploymentNumber ? data.bpjsEmploymentNumber : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.bpjsKesehatan)}
        value={data.bpjsHealthCareNumber ? data.bpjsHealthCareNumber : 'N/A'}
      />
      {
        props.data.changes &&
        <React.Fragment>
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
        </React.Fragment>
      }
    </CardContent>
  </Card>
  );

  return render;
};

export const AccountEmployeeInformation = compose<AllProps, OwnProps>(
  injectIntl
)(accountEmployeeInformation);