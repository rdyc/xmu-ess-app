import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import { ProjectAssignmentItem } from '@project/components/assignment/detail/shared/ProjectAssignmentItem';
import { ProjectInformationSimple } from '@project/components/registration/detail/shared/ProjectInformationSimple';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAcceptanceApprovalProps } from './ProjectAcceptanceApproval';

export const ProjectAcceptanceApprovalView: React.SFC<ProjectAcceptanceApprovalProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ProjectAssignmentAcceptance,
      parentUid: AppMenu.ProjectAssignment,
      parentUrl: `/project/acceptances/${props.match.params.assignmentUid}`,
      title: props.intl.formatMessage(projectMessage.acceptance.page.approvalTitle),
      description: props.intl.formatMessage(projectMessage.acceptance.page.approvalSubHeader)
    }}
    state={props.projectAcceptanceState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IProjectAssignmentDetailItem) => (
      <ProjectInformationSimple data={data.project} />
    )}
    secondary={(data: IProjectAssignmentDetailItem) => ([
      <ProjectAssignmentItem 
        data={data} 
        title={props.intl.formatMessage(projectMessage.assignment.section.itemTitle)} 
        // subHeader={props.intl.formatMessage(projectMessage.assignment.section.itemSubHeader)} 
      />,
      <React.Fragment>
        {
          data.statusType === WorkflowStatusType.Submitted &&
          <WorkflowApprovalForm
            approvalTitle={props.approvalTitle}
            approvalSubHeader={props.approvalSubHeader}
            approvalChoices={props.approvalChoices}
            approvalTrueValue={props.approvalTrueValue}
            approvalDialogTitle={props.approvalDialogTitle}
            approvalDialogContentText={props.approvalDialogContentText}
            approvalDialogCancelText={props.approvalDialogCancelText}
            approvalDialogConfirmedText={props.approvalDialogConfirmedText}
            validate={props.handleOnValidate}
            onSubmit={props.handleOnSubmit} 
            onSubmitSuccess={props.handleOnSubmitSuccess}
            onSubmitFail={props.handleOnSubmitFail}
          />
        }
      </React.Fragment>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="project-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  />
);