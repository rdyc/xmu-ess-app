import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import { IWebJobRecurringDetail } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobRecurringDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const webJobRecurringInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Detail'})}
      />
      <CardContent>
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.recurring.field.uid)}
          value={data.uid}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.recurring.field.name)}
          value={data.name}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.recurring.field.description)}
          value={data.description}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.recurring.field.expression)}
          value={data.cron.expression}
        />
        <TextField
          multiline
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.recurring.field.cronDesc)}
          value={data.cron.description}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(webJobMessage.recurring.field.isAutoStart)}
          value={data.isAutoStart}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const WebJobRecurringInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(webJobRecurringInformation);