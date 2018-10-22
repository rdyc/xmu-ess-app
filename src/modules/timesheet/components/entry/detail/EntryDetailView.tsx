import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import { ITimesheetDetail } from '@timesheet/classes/response';
// import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { EntryDetailProps } from './EntryDetail';

export const EntryDetailView: React.SFC<EntryDetailProps> = props => {
  const {
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText, handleDialogClose, handleDialogConfirmed, intl
  } = props;

  const { isLoading, response } = props.timesheetState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="timesheet-detail-dialog-title"
      aria-describedby="timesheet-detail-dialog-description"
    >
      <DialogTitle id="timesheet-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="timesheet-detail-dialog-description">
          {dialogDescription || 'description'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {dialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {dialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDetail = (timesheet: ITimesheetDetail) => (
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
          value={timesheet.site ? timesheet.site.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.start" />}
          value={intl.formatTime(timesheet.start, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'GMT'
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
            timeZone: 'GMT'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.totalHours" />}
          value={timesheet.hours ? timesheet.hours : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.notes" />}
          value={timesheet.description ? timesheet.description : 'N/A'}
        />
      </CardContent>
    </Card>
  );

  const render = (
    <React.Fragment>
      {
        isLoading &&
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      }
      {
        response &&
        <Grid
          container
          spacing={24}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
          <Grid item xs={12} md={8}>
            {
              response &&
              response.data &&
              response.data.workflow &&
              response.data.workflow.steps &&
              <WorkflowStep steps={response.data.workflow.steps} />
            }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};