import { WorkflowStatusType } from '@common/classes/types';
import { Grid, Typography } from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ProjectAssignmentItem } from '@project/components/assignment/detail/shared/ProjectAssignmentItem';
import { ProjectInformationSimple } from '@project/components/registration/detail/shared/ProjectInformationSimple';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProjectAcceptanceApprovalProps } from './ProjectAcceptanceApproval';

export const ProjectAcceptanceApprovalView: React.SFC<ProjectAcceptanceApprovalProps> = props => {
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
            <ProjectInformationSimple data={response.data.project} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ProjectAssignmentItem 
              data={response.data} 
              title={props.intl.formatMessage(projectMessage.assignment.section.acceptanceTitle)} 
              subHeader={props.intl.formatMessage(projectMessage.assignment.section.acceptanceSubHeader)} 
            />
          </Grid>

          {
            response.data.statusType === WorkflowStatusType.Submitted &&
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