import { WorkflowStatusType } from '@common/classes/types';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITimesheetDetail;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const timesheetInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(timesheetMessage.entry.section.infoTitle)}
        subheader={props.intl.formatMessage(timesheetMessage.entry.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.date)}
          value={props.intl.formatDate(props.data.date, GlobalFormat.Date)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.activityType)}
          value={props.data.activity ? props.data.activity.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.customerUid)}
          value={props.data.customer ? props.data.customer.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline={true}
          label={props.intl.formatMessage(timesheetMessage.entry.field.projectUid)}
          value={props.data.project ? `${props.data.project.uid} - ${props.data.project.name}` : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.siteUid)}
          value={props.data.site ? props.data.site.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.siteValue)}
          value={props.intl.formatNumber(props.data.site ? props.data.site.value : 0)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.start)}
          value={props.intl.formatTime(props.data.start, GlobalFormat.Time)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.end)}
          value={props.intl.formatTime(props.data.end, GlobalFormat.Time)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(timesheetMessage.entry.field.totalHours)}
          value={props.data.hours ? props.data.hours : 0}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline={true}
          label={props.intl.formatMessage(timesheetMessage.entry.field.notes)}
          value={props.data.description || 'N/A'}
        />
        {(props.data.mileageExceptionUid) ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(timesheetMessage.entry.field.mileagePercentage)}
            value={`${props.data.mileageException ? props.data.mileageException.percentage : 0} %`}
          /> : ''
        }
        {(props.data.mileageExceptionUid) ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline={true}
            label={props.intl.formatMessage(timesheetMessage.entry.field.mileageDescription)}
            value={props.data.mileageException && props.data.mileageException.description || 'N/A'}
          /> : ''
        }
        {(props.data.mileageExceptionUid) ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline={true}
            label={props.intl.formatMessage(timesheetMessage.entry.field.mileageReason)}
            value={props.data.mileageException && props.data.mileageException.reason || 'N/A'}
          /> : ''
        }
        {(props.data.statusType === WorkflowStatusType.Rejected) ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline={true}
            label={props.intl.formatMessage(timesheetMessage.entry.field.rejectReason)}
            value={props.data.notes || 'N/A'}
          /> : ''
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const TimesheetInformation = compose<AllProps, OwnProps>(injectIntl)(timesheetInformation);