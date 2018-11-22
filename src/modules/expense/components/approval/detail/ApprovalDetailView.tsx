import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';

import { layoutMessage } from '@layout/locales/messages';
import { ExpenseApprovalDetailProps } from './ApprovalDetail';

export const ApprovalDetailView: React.SFC<ExpenseApprovalDetailProps> = props => {
  const { 
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue, 
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText 
  } = props;
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl } = props;
  const { isLoading, response } = props.expenseApprovalState.detail;

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          {intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }
      {
        !isLoading &&
        response && 
        response.data &&
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <ExpenseInformation data={response.data}/>
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