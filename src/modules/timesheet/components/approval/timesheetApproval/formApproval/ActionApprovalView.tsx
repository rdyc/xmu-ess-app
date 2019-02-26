import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { ApprovalTimesheetsProps } from './ActionApproval';
import { TimesheetBulkInformation } from './TimesheetBulkInformation';

export const ActionApprovalView: React.SFC<ApprovalTimesheetsProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TimesheetApproval,
      parentUid: AppMenu.Timesheet,
      parentUrl: '/timesheet/approvals',
      title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
      description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader)
    }}
    state={props.timesheetApprovalState.detail}
    onLoadApi={props.handleLoadData}
    primary={(data: ITimesheetDetail) => (
      <TimesheetBulkInformation data={props.timesheets} />
    )}
    secondary={(data: ITimesheetDetail) => ([
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
  />
);