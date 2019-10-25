import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import { IWebJobDefinitionDetail } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobDefinitionDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const webJobDefinitionInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Definition'})}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.definition.field.uid)}
          value={data.uid}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.definition.field.name)}
          value={data.name}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.definition.field.description)}
          value={data.description}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.definition.field.assembly)}
          value={data.assembly}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.definition.field.version)}
          value={data.version}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.definition.field.jobsCount)}
          value={data.jobsCount}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const WebJobDefinitionInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(webJobDefinitionInformation);