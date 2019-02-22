import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { ILeaveDetail } from '@leave/classes/response';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import * as React from 'react';
import { LeaveCancellationForm } from '../form/LeaveCancellationForm';
import { LeaveCancellationDetailProps } from './LeaveCancellationDetail';

export const LeaveCancellationDetailView: React.SFC<LeaveCancellationDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LeaveCancelation,
      parentUid: AppMenu.LeaveRequest,
      parentUrl: '/leave/cancellations',
      title: props.intl.formatMessage(leaveMessage.cancellation.page.detailTitle),
      description: props.intl.formatMessage(leaveMessage.cancellation.page.detailTitle)
    }}
    options={props.pageOptions}
    state={props.leaveCancellationState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILeaveDetail) => (
      <LeaveInformation data={data} />
    )}
    secondary={(data: ILeaveDetail) => ([
      <React.Fragment>
        {
          <LeaveCancellationForm
            cancellationTitle={props.cancellationTitle}
            cancellationSubHeader={props.cancellationSubHeader}
            cancellationDialogTitle={props.cancellationDialogTitle}
            cancellationDialogContentText={props.cancellationDialogContentText}
            cancellationDialogCancelText={props.cancellationDialogCancelText}
            cancellationDialogConfirmedText={props.cancellationDialogConfirmedText}
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