import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
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
    options={props.pageOptions}
    state={props.timesheetApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITimesheetDetail) => (
      <TimesheetInformation data={data} />
    )}
    secondary={(data: ITimesheetDetail) => ([
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
  />
);