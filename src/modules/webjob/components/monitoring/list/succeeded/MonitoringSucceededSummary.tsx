import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobMonitoringJobSucceeded } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobMonitoringJobSucceeded;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const monitoringSucceededSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.id)}
        value={props.data.id}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.job)}
        value={props.data.job}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.result)}
        value={props.data.result || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.totalDuration)}
        value={props.data.totalDuration}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.succeededAt)}
        value={props.intl.formatDate(props.data.succeededAt, GlobalFormat.DateTime)}
      />
    </Grid>
  </Grid>
);

export const MonitoringSucceededSummary = compose<AllProps, OwnProps>(
  injectIntl
)(monitoringSucceededSummary);