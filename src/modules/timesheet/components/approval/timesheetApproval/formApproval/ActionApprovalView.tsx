import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
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
    primary={(data: ITimesheetDetail) => ([
      <TimesheetBulkInformation data={props.timesheets} />
    ])}
    secondary={(data: ITimesheetDetail) => ([
      <React.Fragment>
        {
          // dasarnya dari get all mengambil data yang pending, alias 'isapproval' pasti true
          // data.workflow && 
          // data.workflow.isApproval &&
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
            confirmationBeforeDialogProps={props.itemUids.length >= 2 && {
              title: props.approvalDialogTitleAttention,
              message: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionIsHolidayOrWeekend, {uids: props.itemUids.join(', ')}),
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            } || 
            props.itemUids.length === 1 && {
              title: props.approvalDialogTitleAttention,
              message: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionIsHolidayOrWeekendOne, {uid: props.itemUids.join(', ')}),
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            } || 
            undefined}
            onSubmit={props.handleOnSubmit}
          />
        }
      </React.Fragment>
    ])}
  />
);