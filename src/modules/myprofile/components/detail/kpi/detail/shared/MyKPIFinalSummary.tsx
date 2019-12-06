import { IKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPIFinal;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const myKPIFinalSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.year)}
        value={props.data.year.toString()}
      />
      
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.period)}
        value={props.data.period === 1 && props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || props.intl.formatMessage(kpiMessage.employee.field.periodFullYear)}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.employeeUid)}
        value={props.data.employee && props.data.employee.fullName || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.totalScore)}
        value={`${props.data.totalScore.toString()} %`}
      />
    </Grid>

    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
          ||
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.createdBy)}
            value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const MyKPIFinalSummary = compose<AllProps, OwnProps>(
  injectIntl
)(myKPIFinalSummary);