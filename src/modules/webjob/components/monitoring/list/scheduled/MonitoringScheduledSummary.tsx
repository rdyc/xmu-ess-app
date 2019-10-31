import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobMonitoringJobScheduled } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobMonitoringJobScheduled;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const monitoringScheduledSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
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
        label={props.intl.formatMessage(webJobMessage.monitoring.field.enqueuedAt)}
        value={props.intl.formatDate(props.data.enqueueAt, GlobalFormat.DateTime)}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(webJobMessage.monitoring.field.scheduledAt)}
        value={props.intl.formatDate(props.data.scheduledAt, GlobalFormat.DateTime)}
      />
    </Grid>
  </Grid>
);

export const MonitoringScheduledSummary = compose<AllProps, OwnProps>(
  injectIntl
)(monitoringScheduledSummary);