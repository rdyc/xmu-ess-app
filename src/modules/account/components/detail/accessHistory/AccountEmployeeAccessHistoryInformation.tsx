import { IEmployeeAccessHistory } from '@account/classes/response/employeeAccessHistory';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeAccessHistory;
  employeeUid: string;
  // employeeName: string;
}

type AllProps = IOwnProps & InjectedIntlProps;

const accountEmployeeAccessHistoryInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(accountMessage.shared.field.titleInformation, {state: 'Access History'})}
      />
      <CardContent>
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.employeeUid)}
          value={props.employeeUid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.uid)}
          value={data.uid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.companyUid)}
          value={data.company && data.company.name || 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.unitType)}
          value={data.unit && data.unit.value || 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.departmentType)}
          value={data.department && data.department.value || 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.levelType)}
          value={data.level && data.level.value || 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.positionUid)}
          value={data.position && data.position.name || 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.start)}
          value={data.start && intl.formatDate(data.start, GlobalFormat.Date) || 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.access.field.end)}
          value={data.end && intl.formatDate(data.end, GlobalFormat.Date) || 'N/A'}
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
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const AccountEmployeeAccessHistoryInformation = compose<AllProps, IOwnProps>(injectIntl)(accountEmployeeAccessHistoryInformation);