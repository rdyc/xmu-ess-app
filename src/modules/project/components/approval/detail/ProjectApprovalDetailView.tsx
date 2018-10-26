import { ProjectType } from '@common/classes/types';
import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ProjectDocument } from '@project/components/registration/detail/shared/ProjectDocument';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import { ProjectSales } from '@project/components/registration/detail/shared/ProjectSales';
import { ProjectSite } from '@project/components/registration/detail/shared/ProjectSite';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

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
            <ProjectInformation data={response.data}/>
          </Grid>
          
          {
            response.data.projectType === ProjectType.Project &&
            <Grid item xs={12} md={4}>
              <ProjectDocument 
                title={intl.formatMessage({id: 'project.document.projectTitle'})}
                subHeader={intl.formatMessage({id: 'project.document.projectSubTitle'})}
                data={response.data.documents}
              />
            </Grid>
          }
          {
            response.data.projectType === ProjectType.PreSales &&
            <Grid item xs={12} md={4}>
              <ProjectDocument 
                title={intl.formatMessage({id: 'project.document.preSalesTitle'})}
                subHeader={intl.formatMessage({id: 'project.document.preSalesSubTitle'})}
                data={response.data.documentPreSales}
              />
            </Grid>
          }

          <Grid item xs={12} md={4}>
            <ProjectSales data={response.data.sales} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ProjectSite data={response.data.sites} />
          </Grid>

          <Grid item xs={12} md={4}>
            <WorkflowHistory data={response.data.workflow} />
          </Grid>

          {
            response.data.workflow &&
            response.data.workflow.isApproval &&
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
           }
        </Grid>
      }
    </React.Fragment>
  );

  return render;
};