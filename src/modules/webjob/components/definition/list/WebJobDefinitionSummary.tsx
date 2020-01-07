import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IWebJobDefinition } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobDefinition;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const webjobDefinitionSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.uid)}
        value={props.data.uid}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.name)}
        value={props.data.name}
      />
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.description)}
        value={props.data.description}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.assembly)}
        value={props.data.assembly}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.version)}
        value={props.data.version}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(webJobMessage.definition.field.jobsCount)}
        value={props.data.jobsCount}
      />
    </Grid>
  </Grid>
);

export const WebjobDefinitionSummary = compose<AllProps, OwnProps>(
  injectIntl
)(webjobDefinitionSummary);