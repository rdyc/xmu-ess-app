import { WorkflowStatusType } from '@common/classes/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITimesheetDetail } from '@timesheet/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITimesheetDetail;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const timesheetInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="timesheet.infoTitle" />}
        subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.uid" />}
          value={data.uid}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.date" />}
          value={intl.formatDate(data.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.activityType" />}
          value={data.activity ? data.activity.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.customerUid" />}
          value={data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.projectUid" />}
          value={data.project ? `${data.project.uid} - ${data.project.name}` : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.siteUid" />}
          value={data.site ? data.site.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.siteValue" />}
          value={intl.formatNumber(data.site ? data.site.value : 0)}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.start" />}
          value={intl.formatTime(data.start, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'GMT',
            hour12: false
          })}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.end" />}
          value={intl.formatTime(data.end, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'GMT',
            hour12: false
          })}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.totalHours" />}
          value={data.hours ? data.hours : 0}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.description" />}
          value={data.description || 'N/A'}
        />
        {(data.statusType === WorkflowStatusType.Approved || data.statusType === WorkflowStatusType.Rejected) ?
          <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="timesheet.entry.field.information.approvalNote" />}
          value={data.notes || 'N/A'}
        /> : ''
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const TimesheetInformation = compose<AllProps, OwnProps>(injectIntl)(timesheetInformation);