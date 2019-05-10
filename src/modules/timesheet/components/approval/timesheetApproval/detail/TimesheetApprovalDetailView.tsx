import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';

import { TimesheetApprovalDetailProps } from './TimesheetApprovalDetail';

export const TimesheetApprovalDetailView: React.SFC<TimesheetApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TimesheetApproval,
      parentUid: AppMenu.Timesheet,
      parentUrl: '/timesheet/approvals',
      title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
      description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader)
    }}
    state={props.timesheetApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITimesheetDetail) => ([
      <TimesheetInformation data={data} />
    ])}
    secondary={(data: ITimesheetDetail) => ([
      <WorkflowHistory data={data.workflow} />
    ])}
    tertiary={(data: ITimesheetDetail) => ([
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
            confirmationBeforeDialogProps={data.isHoliday && {
              title: props.approvalDialogTitleAttention,
              message: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionIsHoliday, {uid: data.uid}),
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            } || data.isWeekend && {
              title: props.approvalDialogTitleAttention,
              message: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionIsWeekend, {uid: data.uid}),
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            } || undefined}
            onSubmit={props.handleOnSubmit}
          />
        }
      </React.Fragment>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="timesheet-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  />
);