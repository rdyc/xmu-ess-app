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

const accountEmployeeBank: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(accountMessage.employee.field.bankTitle)}
        subheader={intl.formatMessage(accountMessage.employee.field.bankSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.employee.field.kartuKeluarga)}
          value={data.familyCardNumber ? data.familyCardNumber : 'N/A'}
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
          label={intl.formatMessage(accountMessage.employee.field.bpjsKetenagakerjaan)}
          value={data.bpjsEmploymentNumber ? data.bpjsEmploymentNumber : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.employee.field.bpjsKesehatan)}
          value={data.bpjsHealthCareNumber ? data.bpjsHealthCareNumber : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.employee.field.bcaNumber)}
          value={data.bank && data.bank.account ? data.bank.account : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.employee.field.bcaName)}
          value={data.bank && data.bank.name ? data.bank.name : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.employee.field.bcaBranch)}
          value={data.bank && data.bank.branch ? data.bank.branch : 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const AccountEmployeeBank = compose<AllProps, OwnProps>(injectIntl)(accountEmployeeBank);