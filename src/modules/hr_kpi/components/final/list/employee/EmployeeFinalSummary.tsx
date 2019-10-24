import { IEmployeeKPIFinal } from '@account/classes/response/employeeKPI';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeKPIFinal;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const employeeFinalSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.uid)}
        value={props.data.uid}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.company)}
        value={props.data.company ? props.data.company.name : 'N/A'}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.joinDate)}
        value={props.intl.formatDate(props.data.joinDate, GlobalFormat.Date)}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.name)}
        value={props.data.fullName}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(kpiMessage.employee.field.latestFinalYear)}
        value={props.data.lastKPIFinal && props.data.lastKPIFinal.year.toString() || 'N/A'}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.nik)}
        value={props.data.employmentNumber}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.email)}
        value={props.data.email}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.phone)}
        value={props.data.phone ? props.data.phone : 'N/A'}
      />
    </Grid>
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const EmployeeFinalSummary = 
  compose<AllProps, OwnProps>(injectIntl)(employeeFinalSummary);