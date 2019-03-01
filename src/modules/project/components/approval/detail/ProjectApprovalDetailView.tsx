import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IProjectDetail } from '@project/classes/response';
import { ProjectDocument } from '@project/components/registration/detail/shared/ProjectDocument';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import { ProjectSales } from '@project/components/registration/detail/shared/ProjectSales';
import { ProjectSite } from '@project/components/registration/detail/shared/ProjectSite';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectApprovalDetailProps } from './ProjectApprovalDetail';

export const ProjectApprovalDetailView: React.SFC<ProjectApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ProjectRegistrationApproval,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: '/project/approvals',
      title: props.intl.formatMessage(projectMessage.approval.page.detailTitle),
      description: props.intl.formatMessage(projectMessage.approval.page.detailTitle)
    }}
    state={props.projectApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IProjectDetail) => (
      <ProjectInformation data={data} />
    )}
    secondary={(data: IProjectDetail) => ([
      <ProjectDocument 
        title={props.intl.formatMessage(projectMessage.registration.section.documentProjectTitle)}
        data={data.documents}
      />,
      <ProjectDocument 
        title={props.intl.formatMessage(projectMessage.registration.section.documentPreSalesTitle)}
        data={data.documentPreSales}
      />,
      <ProjectSales data={data.sales} />,
      <ProjectSite data={data.sites} />,
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
          data.workflow && 
          data.workflow.isApproval &&
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