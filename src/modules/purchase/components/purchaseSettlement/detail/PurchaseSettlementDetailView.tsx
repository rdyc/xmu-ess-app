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
import { PurchaseSettlementDetailProps } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetail';
import * as React from 'react';
// import { FormattedMessage } from 'react-intl';
import { SettlementInformation } from './shared/SettlementInformation';
import { SettlementItemInformation } from './shared/SettlementItemInformation';

export const PurchaseSettlementDetailView: React.SFC<PurchaseSettlementDetailProps> = props => {
  const {
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed
  } = props;

  const { isLoading, response } = props.purchaseSettlementState.detail;

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
        <LinearProgress variant="query" />
      }
      {
        !isLoading &&
        response &&
        response.data &&
        <Grid container spacing={16} >
          <Grid item xs={12} md={4}>
            <SettlementInformation data={response.data} />
          </Grid>

          <Grid container item xs={12} md={8}>
            <Grid container spacing={16}>
              {
                response.data.items &&
                response.data.items.map((item, index) =>
                  <Grid key={index} item xs={12} md={4}>
                    <SettlementItemInformation
                      data={item}
                      title={`Settlement Item #${index + 1} `} />
                  </Grid>
                )
              }
            </Grid>
          </Grid>
          <Grid item>
          { response.data.statusType ? 
            <WorkflowHistory data={response.data.workflow} />
          : '' }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};