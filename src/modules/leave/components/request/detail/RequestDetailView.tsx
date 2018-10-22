import { ILeaveRequestDetail } from '@leave/classes/response';
import { RequestDetailProps } from '@leave/components/request/detail/RequestDetail';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RequestDetailView: React.SFC<RequestDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
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

  const renderDetail = (leave: ILeaveRequestDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leave.infoTitle"/>}
        subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.uid" />}
          value={leave.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.status" />}
          value={leave.status ? leave.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.type" />}
          value={leave.leave ? leave.leave.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          hidden 
          margin="normal"
          label={<FormattedMessage id="leave.field.regular" />}
          value={leave.regular ? leave.regular.leave ? leave.regular.leave.name : 'N/A' : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.start" />}
          value={intl.formatDate(leave.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.end" />}
          value={intl.formatDate(leave.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.name" />}
          value={leave.address}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.contactNumber" />}
          value={leave.contactNumber}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.reason" />}
          value={leave.reason}
        />
      </CardContent>
    </Card>
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
              renderDetail(response.data)
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
