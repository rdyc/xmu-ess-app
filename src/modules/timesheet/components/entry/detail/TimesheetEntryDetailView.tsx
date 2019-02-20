import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';

import { TimesheetInformation } from './shared/TimesheetInformation';
import { TimesheetEntryDetailProps } from './TimesheetEntryDetail';

export const TimesheetEntryDetailView: React.SFC<TimesheetEntryDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TimesheetHistory,
      parentUid: AppMenu.Timesheet,
      parentUrl: '/timesheet/requests',
      title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
      description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader)
    }}
    options={props.pageOptions}
    state={props.timesheetEntryState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITimesheetDetail) => (
      <TimesheetInformation data={data} />
    )}
    secondary={(data: ITimesheetDetail) => ([
      <WorkflowHistory data={data.workflow} />
    ])}
  >
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </PreviewPage>
);
