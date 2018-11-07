import { AccountLeave } from '@account/components/leave/AccountLeave';
import { RequestDetailProps } from '@leave/components/request/detail/LeaveRequestDetail';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LeaveInformation } from './shared/LeaveInformation';

export const LeaveRequestDetailView: React.SFC<RequestDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed
  } = props;
  const { isLoading, response } = props.leaveRequestState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="leaveRequest-detail-dialog-title"
      aria-describedby="leaveRequest-detail-dialog-description"
    >
      <DialogTitle id="leaveRequest-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="leaveRequest-detail-dialog-description">
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
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        response && 
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              <LeaveInformation
                data={response.data}
              />
            }
          </Grid>

          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              <AccountLeave
              />
            }
          </Grid> 

          <Grid item xs={12} md={4}>
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
