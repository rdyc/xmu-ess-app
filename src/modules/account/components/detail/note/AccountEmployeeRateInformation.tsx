import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeRate;
  employeeUid: string;
}

type AllProps = IOwnProps & InjectedIntlProps;

const accountEmployeeRateInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(accountMessage.shared.field.titleInformation, {state: 'Rate'})}
      />
      <CardContent>
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.employee.field.uid)}
          value={props.employeeUid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.rate.field.uid)}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(accountMessage.rate.field.value)}
          value={props.intl.formatNumber(props.data.value, GlobalFormat.CurrencyDefault)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(accountMessage.rate.field.isActive)}
          value={props.data.isActive && props.intl.formatMessage(accountMessage.rate.field.isActiveTrue) || props.intl.formatMessage(accountMessage.rate.field.isActiveFalse)}
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

export const AccountEmployeeRateInformation = compose<AllProps, IOwnProps>(injectIntl)(accountEmployeeRateInformation);