import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TimesheetInformation } from './shared/TimesheetInformation';
import { EntryDetailProps } from './TimesheetEntryDetail';

export const TimesheetEntryDetailView: React.SFC<EntryDetailProps> = props => {
  const {
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText, handleDialogClose, handleDialogConfirmed
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

  const render = (
    <React.Fragment>
      {
        isLoading &&
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      }
      {
        !isLoading &&
        response &&
        response.data &&
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <TimesheetInformation data={response.data} />
          </Grid>
          <Grid item xs={12} md={8}>
            <WorkflowHistory data={response.data.workflow} />
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};