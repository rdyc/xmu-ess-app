import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobDefinitionJob } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobDefinitionJob;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const definitionJobSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.uid)}
        value={props.data.uid}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.namespace)}
        value={props.data.namespace}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.class)}
        value={props.data.class}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.method)}
        value={props.data.method}
      />
    </Grid>
  </Grid>
);

export const DefinitionJobSummary = compose<AllProps, OwnProps>(
  injectIntl
)(definitionJobSummary);