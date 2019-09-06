import { IEmployeeContract } from '@account/classes/response/employeeContract';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeContract;
  employeeUid: string;
}

type AllProps = IOwnProps & InjectedIntlProps;

const accountEmployeeContractInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(accountMessage.shared.field.titleInformation, {state: 'Contract'})}
      />
      <CardContent>
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.contract.field.contractNumber)}
          value={data.contractNumber}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.contract.field.start)}
          value={intl.formatDate(data.start, GlobalFormat.Date)}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.contract.field.end)}
          value={intl.formatDate(data.end, GlobalFormat.Date)}
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

export const AccountEmployeeContractInformation = compose<AllProps, IOwnProps>(injectIntl)(accountEmployeeContractInformation);