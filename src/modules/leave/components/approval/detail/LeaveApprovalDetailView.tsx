import { AccountLeave } from '@account/components/leave';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { ILeaveDetail } from '@leave/classes/response';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { LeaveApprovalDetailProps } from './LeaveApprovalDetail';

export const LeaveApprovalDetailView: React.SFC<LeaveApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LeaveApproval,
      parentUid: AppMenu.Leave,
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
      <AccountLeave employeeUid={data.employeeUid}/>,
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
          data.workflow && 
          data.workflow.isApproval &&
          <WorkflowApprovalForm 
            title={props.approvalTitle}
            statusTypes={props.approvalStatusTypes}
            trueTypes={props.approvalTrueValues}
            confirmationDialogProps={{
              title: props.approvalDialogTitle,
              message: props.approvalDialogContentText,
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            }}
            onSubmit={props.handleOnSubmit}
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