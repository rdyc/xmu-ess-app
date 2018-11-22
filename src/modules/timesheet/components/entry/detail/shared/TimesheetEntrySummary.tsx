import { WorkflowStatusType } from '@common/classes/types';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { ITimesheet } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITimesheet;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const timesheetEntrySummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.statusType)}
        value={props.data.status ? props.data.status.value : props.data.statusType}
      />
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
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.projectUid)}
        value={props.data.project ? props.data.project.name : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.siteUid)}
        value={props.data.site ? props.data.site.name : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.mileageException)}
        value={`${props.data.mileageException ? props.data.mileageException.percentage : 0} %`}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.siteValue)}
        value={props.intl.formatNumber(props.data.site ? props.data.site.value : 0)}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.start)}
        value={props.intl.formatTime(props.data.start, {
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'GMT',
          hour12: false
        })}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(timesheetMessage.entry.field.end)}
        value={props.intl.formatTime(props.data.end, {
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'GMT',
          hour12: false
        })}
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
      {(props.data.statusType === WorkflowStatusType.Rejected) ?
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline={true}
          label={props.intl.formatMessage(timesheetMessage.entry.field.rejectReason)}
          value={props.data.notes || 'N/A'}
        /> : ''
      }
    </Grid>

    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
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
      </Grid>
    }
  </Grid>
);

export const TimesheetEntrySumarry = compose<AllProps, OwnProps>(
  injectIntl
)(timesheetEntrySummary);