import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILeaveDetail } from '@leave/classes/response';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  data: ILeaveDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const leaveInformation: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(leaveMessage.request.section.infoTitle)}
      // subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.statusType)}
          value={props.data.status ? props.data.status.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.leaveType)}
          value={props.data.leave ? props.data.leave.value : 'N/A'}
        />
        {data.regular && data.regular.leave && data.regular.leave.name ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            hidden
          label={props.intl.formatMessage(leaveMessage.request.field.regularType)}
          value={props.data.regular ? props.data.regular.leave ? props.data.regular.leave.name : 'N/A' : 'N/A'}
        /> : null}

        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.start)}
          value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.end)}
          value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.reEntry)}
          value={props.intl.formatDate(props.data.reEntry, GlobalFormat.Date)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.address)}
          value={props.data.address}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.contactNumber)}
          value={props.data.contactNumber}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.reason)}
          value={props.data.reason}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(leaveMessage.request.field.requestedLeave)}
          value={props.data.requestedLeave}
        />
        {
          !isNullOrUndefined(data.rejectedReason) ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(leaveMessage.request.field.rejectedReason)}
            value={data.rejectedReason || 'N/A'}
          /> : ''
        }
        {
          props.data.changes &&
          <React.Fragment>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.createdBy)}
              value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
            />

            {
              (props.data.changes.updated && props.data.changes.updatedAt) &&
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
                value={props.data.changes.updated.fullName || 'N/A'}
                helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
              />
            }
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const LeaveInformation = compose<AllProps, OwnProps>(
  injectIntl
)(leaveInformation);