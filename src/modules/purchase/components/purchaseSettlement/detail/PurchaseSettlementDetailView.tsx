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
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { PurchaseSettlementDetailProps } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetail';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
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
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      }
      {
        !isLoading &&
        response &&
        response.data &&
        <Grid
          container
          spacing={16}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item 
          // xs={12} 
          md={4}>
            <SettlementInformation data={response.data} />
          </Grid>

          <Grid item 
          // xs={12} 
          md={8}>
            <SettlementItemInformation data={response.data.items} />
          </Grid>

          <Grid item 
          // xs={12} 
          md={4} 
          >
            <WorkflowHistory data={response.data.workflow} />
          </Grid>
        </Grid>
        
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};