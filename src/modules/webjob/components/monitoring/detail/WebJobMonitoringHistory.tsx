import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { lightBlue, orange, red } from '@material-ui/core/colors';
import { Check, Clear, HourglassEmpty, Queue } from '@material-ui/icons';
import { IWebJobMonitoringJobDetail } from '@webjob/classes/response';
import { IWebJobStatename } from '@webjob/classes/types';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWebJobMonitoringJobDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const webJobMonitoringHistory: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
    <Grid container spacing={16}>
      {
        data.history.length > 0 &&
        data.history.map((item: any, index: number) => 
          <Grid item xs={12} lg={4} xl={4} key={index}>
            <Card square>
              <CardHeader
                avatar={
                  <Avatar style={{
                    color: '#fff',
                    backgroundColor: 
                      item.stateName === IWebJobStatename.Succeeded && orange[500] ||
                      item.stateName === IWebJobStatename.Processing && lightBlue[500] ||
                      item.stateName === IWebJobStatename.Enqueued && lightBlue[500] ||
                      item.stateName === IWebJobStatename.Failed && red[500] || ''
                  }} >
                    {item.stateName === IWebJobStatename.Succeeded && <Check fontSize="default" />}
                    {item.stateName === IWebJobStatename.Processing && <HourglassEmpty fontSize="default" />}
                    {item.stateName === IWebJobStatename.Enqueued && <Queue fontSize="default" />}
                    {item.stateName === IWebJobStatename.Failed && <Clear fontSize="default" />}
                  </Avatar>
                }
                title={
                  <Typography variant="h6">
                    {item.stateName}
                  </Typography>
                }
                subheader={`${moment(item.data.succeededAt || item.data.startedAt || item.data.enqueuedAt || item.data.failedAt).fromNow()}${item.reason && `- ${item.reason}` || ''}`}
              />
              <CardContent>
                {
                  item.stateName === IWebJobStatename.Succeeded &&
                  <React.Fragment>
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.succeededAt)}
                      value={props.intl.formatDate(item.data.succeededAt, GlobalFormat.DateTime)}
                    />
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.type, {state: 'Duration'})}
                      value={item.data.performanceDuration}
                    />
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.type, {state: 'Result'})}
                      value={item.data.result}
                    />
                  </React.Fragment>
                }
                {
                  item.stateName === IWebJobStatename.Processing &&
                  <React.Fragment>
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.startedAt)}
                      value={props.intl.formatDate(item.data.startedAt, GlobalFormat.DateTime)}
                    />
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.type, {state: 'Server'})}
                      value={item.data.serverId}
                    />
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.type, {state: 'Worker'})}
                      value={item.data.workerId}
                    />
                  </React.Fragment>
                }
                {
                  item.stateName === IWebJobStatename.Enqueued &&
                  <React.Fragment>
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.enqueuedAt)}
                      value={props.intl.formatDate(item.data.enqueuedAt, GlobalFormat.DateTime)}
                    />
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.type, {state: 'Queue'})}
                      value={item.data.queue}
                    />
                  </React.Fragment>
                }
                {
                  item.stateName === IWebJobStatename.Failed &&
                  <React.Fragment>
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                      multiline
                      label={props.intl.formatMessage(webJobMessage.monitoring.field.failedAt)}
                      value={props.intl.formatDate(item.data.failedAt, GlobalFormat.DateTime)}
                    />]
                  </React.Fragment>
                }
              </CardContent>
            </Card>
          </Grid>
        )
      }
    </Grid>
  );

  return render;
};

export const WebJobMonitoringHistory = compose<AllProps,  OwnProps>(
  injectIntl
)(webJobMonitoringHistory);