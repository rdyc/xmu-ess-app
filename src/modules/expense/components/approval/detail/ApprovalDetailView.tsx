import { ApprovalDetailProps } from '@expense/components/approval/detail/ApprovalDetail';
import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
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
import { Approval } from './approval/Approval';

export const ApprovalDetailView: React.SFC<ApprovalDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.expenseApprovalState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="expense-detail-dialog-title"
      aria-describedby="expense-detail-dialog-description"
    >
      <DialogTitle id="expense-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="expense-detail-dialog-description">
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
              <ExpenseInformation
                data={response.data}
                intl={intl}
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

          <Grid item xs={12} md={4}>
          {
            response &&
            response.data &&
            response.data.workflow &&
            response.data.workflow.isApproval &&
            <Approval
              
            />
          }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};