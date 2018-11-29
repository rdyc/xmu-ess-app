import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILeaveDetail } from '@leave/classes/response';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import * as React from 'react';
import { LeaveCancellationForm } from '../form/LeaveCancellationForm';
import { LeaveCancellationDetailProps } from './LeaveCancellationDetail';

const config: SingleConfig<ILeaveDetail, LeaveCancellationDetailProps> = {
  // page info
  page: (props: LeaveCancellationDetailProps) => ({
    uid: AppMenu.LeaveCancelation,
    parentUid: AppMenu.Leave,
    title: props.intl.formatMessage(leaveMessage.cancellation.page.detailTitle),
    description: props.intl.formatMessage(leaveMessage.cancellation.page.detailTitle)
  }),

  // parent url
  parentUrl: (props: LeaveCancellationDetailProps) => '/leave/cancellations',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LeaveCancellationDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LeaveRequestUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: LeaveCancellationDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.leaveCancellationState.detail;
    const { loadDetailRequest } = props.leaveCancellationDispatch;

    // when user is set and not loading and has LeaveUid in route params
    if (user && !isLoading && props.match.params.leaveUid) {
      // when LeaveUid was changed or response are empty or force to reload
      if ((request && request.leaveUid !== props.match.params.leaveUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          leaveUid: props.match.params.leaveUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: LeaveCancellationDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.leaveCancellationState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ILeaveDetail, props: LeaveCancellationDetailProps) => (
    <LeaveInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ILeaveDetail, props: LeaveCancellationDetailProps) => ([
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
  ])
};

export const LeaveCancellationDetailView: React.SFC<LeaveCancellationDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);