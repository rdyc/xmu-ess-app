import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobMonitoringQueue } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobMonitoringQueue;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const monitoringQueuesSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.monitoring.field.name)}
        value={props.data.name}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.monitoring.field.length)}
        value={props.data.length}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.monitoring.field.fetched)}
        value={props.data.fetched}
      />
    </Grid>

    {/* <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.monitoring.field.scheduledAt)}
        value={props.intl.formatDate(props.data.scheduledAt, GlobalFormat.DateTime)}
      />
    </Grid> */}
  </Grid>
);

export const MonitoringQueuesSummary = compose<AllProps, OwnProps>(
  injectIntl
)(monitoringQueuesSummary);