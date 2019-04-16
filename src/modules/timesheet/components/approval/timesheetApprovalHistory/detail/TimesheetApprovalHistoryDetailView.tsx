import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';

import { TimesheetApprovalHistoryDetailProps } from './TimesheetApprovalHistoryDetail';

export const TimesheetApprovalHistoryDetailView: React.SFC<TimesheetApprovalHistoryDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TimesheetApprovalHistory,
      parentUid: AppMenu.Timesheet,
      parentUrl: '/timesheet/approvals/history',
      title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
      description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader)
    }}
    state={props.timesheetApprovalHistoryState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITimesheetDetail) => ([
      <TimesheetInformation data={data} />
    ])}
    secondary={(data: ITimesheetDetail) => ([
      <WorkflowHistory data={data.workflow} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="timesheet-approval-history-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  />
);