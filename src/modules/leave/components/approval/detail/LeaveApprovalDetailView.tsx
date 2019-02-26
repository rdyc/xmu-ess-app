import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { ILeaveDetail } from '@leave/classes/response';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { LeaveApprovalDetailProps } from './LeaveApprovalDetail';

export const LeaveApprovalDetailView: React.SFC<LeaveApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LeaveApproval,
      parentUid: AppMenu.LeaveRequest,
      parentUrl: '/leave/approvals',
      title: props.intl.formatMessage(leaveMessage.approval.page.detailTitle),
      description: props.intl.formatMessage(leaveMessage.approval.page.detailTitle)
    }}
    state={props.leaveApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILeaveDetail) => (
      <LeaveInformation data={data} />
    )}
    secondary={(data: ILeaveDetail) => ([
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
            validate={props.handleValidate}
            onSubmit={props.handleSubmit} 
            onSubmitSuccess={props.handleSubmitSuccess}
            onSubmitFail={props.handleSubmitFail}
          />
        }
      </React.Fragment>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="leave-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  />
);