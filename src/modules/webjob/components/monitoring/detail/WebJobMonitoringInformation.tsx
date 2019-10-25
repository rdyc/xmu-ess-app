import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import { IWebJobMonitoringJobDetail } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobMonitoringJobDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const webJobMonitoringInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Detail'})}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(webJobMessage.monitoring.field.job)}
          value={data.job}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(webJobMessage.monitoring.field.createdAt)}
          value={props.intl.formatDate(props.data.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(webJobMessage.monitoring.field.expireAt)}
          value={props.intl.formatDate(props.data.expireAt, GlobalFormat.DateTime) || 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const WebJobMonitoringInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(webJobMonitoringInformation);