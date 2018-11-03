import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProjectAcceptanceDetailProps } from './ProjectAcceptanceDetail';

export const ProjectAcceptanceDetailView: React.SFC<ProjectAcceptanceDetailProps> = props => {
  const { 
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue, 
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText 
  } = props;
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectAcceptanceState.detail;

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
            {/* <ProjectInformation data={response.data.project}/> */}
          </Grid>
          
          <Grid item xs={12} md={4}>
            
          </Grid>

          <Grid item xs={12} md={4}>
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
        </Grid>
      }
    </React.Fragment>
  );

  return render;
};