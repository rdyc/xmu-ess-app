import { accountMessage } from '@account/locales/messages/accountMessage';
import { IAccountEmployeeCompetency } from '@hr/classes/response';
// import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IAccountEmployeeCompetency;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const hrCompetencySummaryAssessment: React.SFC<AllProps> = props => (
  <Grid container>
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
        label={props.intl.formatMessage(accountMessage.employee.field.nik)}
        value={props.data.employmentNumber}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.employment)}
        value={props.data.employment && props.data.employment.value || props.data.employmentType}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
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
        label={props.intl.formatMessage(accountMessage.employee.field.companyEmail)}
        value={props.data.email}
      />
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.email)}
        value={props.data.emailPersonal}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField 
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.employee.field.phone)}
        value={props.data.phone ? props.data.phone : 'N/A'}
      />
    </Grid>
  </Grid>
);

export const HrCompetencySummaryAssessment = compose<AllProps, OwnProps>(
  injectIntl
)(hrCompetencySummaryAssessment);