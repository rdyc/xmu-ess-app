import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobMonitoringJobFailed } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobMonitoringJobFailed;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const monitoringFailedSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.id)}
        value={props.data.id}
      />
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
        label={props.intl.formatMessage(webJobMessage.monitoring.field.reason)}
        value={props.data.reason}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.exceptionType)}
        value={props.data.exceptionType}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.exceptionMessage)}
        value={props.data.exceptionMessage}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.exceptionDetails)}
        value={props.data.exceptionDetails}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.failedAt)}
        value={props.intl.formatDate(props.data.failedAt, GlobalFormat.DateTime)}
      />
    </Grid>
  </Grid>
);

export const MonitoringFailedSummary = compose<AllProps, OwnProps>(
  injectIntl
)(monitoringFailedSummary);