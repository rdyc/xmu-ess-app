import { layoutMessage } from '@layout/locales/messages';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@material-ui/core';
import { MileageRequestDetailProps } from '@mileage/components/request/detail/MileageRequestDetail';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';

export const MileageRequestDetailView: React.SFC<
  MileageRequestDetailProps
> = props => {
  const {
    dialogFullScreen,
    dialogOpen,
    dialogTitle,
    dialogDescription,
    dialogCancelText,
    dialogConfirmedText,
    handleDialogClose,
    handleDialogConfirmed
  } = props;

  const { isLoading, response } = props.mileageRequestState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="mileage-detail-dialog-title"
      aria-describedby="mileage-detail-dialog-description"
    >
      <DialogTitle id="mileage-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="mileage-detail-dialog-description">
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
      {isLoading && (
        <Typography variant="body2">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      )}
      {!isLoading &&
        response &&
        response.data && (
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <MileageInformation data={response.data} />
            </Grid>
            <Grid item xs={12} md={4}>
              {response.data.items && response.data.workflow && (
                <MileageItem items={response.data.items}/>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <WorkflowHistory data={response.data.workflow} />
            </Grid>
          </Grid>
        )}
      {renderDialog}
    </React.Fragment>
  );

  return render;
};
