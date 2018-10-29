
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { LeaveApprovalDetailProps } from './LeaveApprovalDetail';

export const LeaveApprovalDetailView: React.SFC<LeaveApprovalDetailProps> = props => {
  const { 
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue, 
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText 
  } = props;
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.leaveApprovalState.detail;

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
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <LeaveInformation data={response.data}/>
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