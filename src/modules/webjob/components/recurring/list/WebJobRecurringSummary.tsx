import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobRecurring } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobRecurring;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const webjobRecurringSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.recurring.field.uid)}
        value={props.data.uid}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.recurring.field.name)}
        value={props.data.name}
      />
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.recurring.field.description)}
        value={props.data.description}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.recurring.field.expression)}
        value={props.data.cron.expression}
      />
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.recurring.field.cronDesc)}
        value={props.data.cron.description}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.recurring.field.isAutoStart)}
        value={props.data.isAutoStart}
      />
    </Grid>
  </Grid>
);

export const WebjobRecurringSummary = compose<AllProps, OwnProps>(
  injectIntl
)(webjobRecurringSummary);