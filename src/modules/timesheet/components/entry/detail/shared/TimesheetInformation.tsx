import { WorkflowStatusType } from '@common/classes/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITimesheetDetail } from '@timesheet/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';

interface OwnProps {
  timesheet: ITimesheetDetail;
  intl: InjectedIntl;
}

export const TimesheetInformation: React.SFC<OwnProps> = props => {
  const { timesheet, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="timesheet.infoTitle" />}
        subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.uid" />}
          value={timesheet.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.date" />}
          value={intl.formatDate(timesheet.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.activityType" />}
          value={timesheet.activity ? timesheet.activity.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.customerName" />}
          value={timesheet.customer ? timesheet.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.projectName" />}
          value={timesheet.project ? timesheet.project.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.projectSite" />}
          value={timesheet.site ? timesheet.site.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.siteValue" />}
          value={intl.formatNumber(timesheet.site ? timesheet.site.value : 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.start" />}
          value={intl.formatTime(timesheet.start, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'GMT',
            hour12: false
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.end" />}
          value={intl.formatTime(timesheet.end, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'GMT',
            hour12: false
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.totalHours" />}
          value={timesheet.hours ? timesheet.hours : 0}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.description" />}
          value={timesheet.description || 'N/A'}
        />
        {(timesheet.statusType === WorkflowStatusType.Approved || timesheet.statusType === WorkflowStatusType.Rejected) ?
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.approvalNote" />}
          value={timesheet.notes || 'N/A'}
        /> : ''
        }
      </CardContent>
    </Card>
  );

  return render;
};