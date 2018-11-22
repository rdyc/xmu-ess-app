import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  // Typography,
} from '@material-ui/core';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { PurchaseRequestDetailProps } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
// import { FormattedMessage } from 'react-intl';
import { PurchaseInformation } from './shared/PurchaseInformation';
import { PurchaseItemInformation } from './shared/PurchaseItemInformation';

export const PurchaseRequestDetailView: React.SFC<PurchaseRequestDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed
  } = props;
  
  const { isLoading, response } = props.purchaseRequestState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="purchase-detail-dialog-title"
      aria-describedby="purchase-detail-dialog-description"
    >
      <DialogTitle id="purchase-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="purchase-detail-dialog-description">
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
        <LinearProgress variant="query"/>
      }
      {
        !isLoading &&
        response &&
        response.data &&
        <Grid container spacing={16} >
          <Grid item xs={12} md={4}>
            <PurchaseInformation data={response.data}/>
          </Grid>

          <Grid container  item xs={12} md={8}>
            <Grid container spacing={16}>
            {
              response.data.items &&
              response.data.items.map((item, index) =>
              <Grid key={index} item xs={12} md={4}>
                <PurchaseItemInformation 
                data={item}
                title={`${props.intl.formatMessage(purchaseMessage.request.section.itemTitle)} - #${index + 1} `} />
              </Grid>
              )
            }
            </Grid>
          </Grid>
          <Grid item md={4}>
            <WorkflowHistory data={response.data.workflow} />
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};