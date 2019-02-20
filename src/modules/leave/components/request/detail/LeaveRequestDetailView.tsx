import { AccountLeave } from '@account/components/leave/AccountLeave';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { ILeaveDetail } from '@leave/classes/response';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { LeaveRequestDetailProps } from './LeaveRequestDetail';
import { LeaveInformation } from './shared/LeaveInformation';

export const LeaveRequestDetailView: React.SFC<LeaveRequestDetailProps> = props => (
  <PreviewPage
     info={{
      uid: AppMenu.LeaveRequest,
      parentUid: AppMenu.Leave,
      parentUrl: '/leave/requests',
      title: props.intl.formatMessage(leaveMessage.request.page.detailTitle),
      description: props.intl.formatMessage(leaveMessage.request.page.detailSubHeader)
    }}
    options={props.pageOptions}
    state={props.leaveRequestState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILeaveDetail) => (
      <LeaveInformation data={data} />
    )}
    secondary={(data: ILeaveDetail) => ([
      <AccountLeave />,
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