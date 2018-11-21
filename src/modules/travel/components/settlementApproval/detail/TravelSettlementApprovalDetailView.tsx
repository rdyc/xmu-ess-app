import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
// import { TravelRequestSummary } from '@travel/components/request/detail/shared/TravelRequestSummary';
import { TravelSettlementInformation } from '@travel/components/settlement/detail/shared/TravelSettlementInformation';
import { TravelSettlementItem } from '@travel/components/settlement/detail/shared/TravelSettlementItem';
import { TravelSettlementSummary } from '@travel/components/settlement/detail/shared/TravelSettlementSummary';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TravelSettlementApprovalDetailProps } from './TravelSettlementApprovalDetail';

export const TravelSettlementApprovalDetailView: React.SFC<TravelSettlementApprovalDetailProps> = props => {
  const { 
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue, 
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText 
  } = props;
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.travelSettlementApprovalState.detail;
  const requestApprovalResponse = props.travelApprovalState.detail.response;

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
        requestApprovalResponse &&
        <Grid container spacing={16}>
          
          <Grid item xs={12} md={4}>
            <TravelSettlementSummary 
              data = {response.data}
              travelData={requestApprovalResponse.data}
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <TravelSettlementItem data = {response.data.items}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <TravelRequestItem data = {requestApprovalResponse.data.items}/>
          </Grid>          
        </Grid>        
      }
      {
        !isLoading &&
        response && 
        response.data &&
        requestApprovalResponse &&
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <TravelSettlementInformation 
              data = {response.data}
              travelData= {requestApprovalResponse.data}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TravelInformation data = {requestApprovalResponse.data}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              <Grid item>
                <WorkflowHistory data={response.data.workflow} />
              </Grid>
              {
                response.data.workflow &&
                response.data.workflow.isApproval &&
                <Grid item>
                  <WorkflowApprovalForm
                    approvalTitle={approvalTitle}
                    approvalSubHeader={approvalSubHeader}
                    approvalChoices={approvalChoices}
                    approvalTrueValue={approvalTrueValue}
                    approvalDialogTitle={approvalDialogTitle}
                    approvalDialogContentText={approvalDialogContentText}
                    approvalDialogCancelText={approvalDialogCancelText}
                    approvalDialogConfirmedText={approvalDialogConfirmedText}
                    validate={handleValidate}
                    onSubmit={handleSubmit} 
                    onSubmitSuccess={handleSubmitSuccess}
                    onSubmitFail={handleSubmitFail}
                  />
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      }      
    </React.Fragment>
  );

  return render;
};