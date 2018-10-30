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
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { TravelRequestSummary } from '@travel/components/request/detail/shared/TravelRequestSummary';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TravelSettlementInformation } from './shared/TravelSettlementInformation';
import { TravelSettlementItem } from './shared/TravelSettlementItem';
import { TravelSettlementSummary } from './shared/TravelSettlementSummary';
import { SettlementDetailProps } from './TravelSettlementDetail';

export const TravelSettlementDetailView: React.SFC<SettlementDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed
  } = props;
  
  const { isLoading, response } = props.travelSettlementState.detail;
  const travelResponse = props.travelRequestState.detail.response;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="travel-detail-dialog-title"
      aria-describedby="travel-detail-dialog-description"
    >
      <DialogTitle id="travel-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="travel-detail-dialog-description">
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
          <Grid item xs={12} md={4}>
            <TravelSettlementInformation data = {response.data}/>
          </Grid>

          <Grid item xs={12} md={3}>
            <TravelSettlementSummary data = {response.data}/>
          </Grid>

          <Grid item xs={12} md={5}>
            <TravelSettlementItem data = {response.data.items}/>
          </Grid>
        
          <Grid item xs={12} md={6}>
            <WorkflowHistory data={response.data.workflow} />
          </Grid>

        </Grid>
      }
      {
        travelResponse &&
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            <TravelInformation data = {travelResponse.data}/>
          </Grid>

          <Grid item xs={12} md={3}>
            <TravelRequestSummary data = {travelResponse.data}/>
          </Grid>

          <Grid item xs={12} md={5}>
            <TravelRequestItem data = {travelResponse.data.items}/>
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};
