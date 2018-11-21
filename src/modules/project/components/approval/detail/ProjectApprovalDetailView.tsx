import { ProjectType } from '@common/classes/types';
import { layoutMessage } from '@layout/locales/messages';
import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ProjectDocument } from '@project/components/registration/detail/shared/ProjectDocument';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import { ProjectSales } from '@project/components/registration/detail/shared/ProjectSales';
import { ProjectSite } from '@project/components/registration/detail/shared/ProjectSite';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectApprovalDetailProps } from './ProjectApprovalDetail';

export const ProjectApprovalDetailView: React.SFC<ProjectApprovalDetailProps> = props => {
  const { 
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue, 
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText 
  } = props;
  const { intl, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectApprovalState.detail;

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
            <ProjectInformation data={response.data}/>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              {
                response.data.projectType === ProjectType.Project &&
                <Grid item>
                  <ProjectDocument 
                    title={intl.formatMessage(projectMessage.registration.section.documentProjectTitle)}
                    subHeader={intl.formatMessage(projectMessage.registration.section.documentProjectSubHeader)}
                    data={response.data.documents}
                  />
                </Grid>
              }
              {
                response.data.projectType === ProjectType.PreSales &&
                <Grid item>
                  <ProjectDocument 
                    title={intl.formatMessage(projectMessage.registration.section.documentPreSalesTitle)}
                    subHeader={intl.formatMessage(projectMessage.registration.section.documentPreSalesSubHeader)}
                    data={response.data.documentPreSales}
                  />
                </Grid>
              }

              <Grid item>
                <ProjectSales data={response.data.sales} />
              </Grid>

              <Grid item>
                <ProjectSite data={response.data.sites} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <WorkflowHistory data={response.data.workflow} />
              </Grid>

              {
                response.data.workflow &&
                response.data.workflow.isApproval &&
                <Grid item xs={12}>
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