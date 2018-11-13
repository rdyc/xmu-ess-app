import {
  Grid,
  LinearProgress,
  // Typography,
} from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { SettlementInformation } from '@purchase/components/purchaseSettlement/detail/shared/SettlementInformation';
import { SettlementItemInformation } from '@purchase/components/purchaseSettlement/detail/shared/SettlementItemInformation';
import { SettlementApprovalDetailProps } from '@purchase/components/settlementHistories/detail/SettlementApprovalDetail';
import * as React from 'react';
// import { FormattedMessage } from 'react-intl';

export const SettlementApprovalDetailView: React.SFC<SettlementApprovalDetailProps> = props => {
  const {
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue,
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText
  } = props;
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.settlementApprovalState.detail;

  const render = (
     <React.Fragment>
      {
        isLoading &&
        <LinearProgress/>
      }
      {
        !isLoading &&
        response &&
        response.data &&
        <Grid container spacing={16}>
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
                title={`Request Item #${index + 1} `} />
              </Grid>
              )
            }
            </Grid>
          </Grid>

          <Grid item>
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