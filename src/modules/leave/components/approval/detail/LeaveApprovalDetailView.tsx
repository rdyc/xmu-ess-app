import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILeaveRequestDetail } from '@leave/classes/response';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { LeaveApprovalDetailProps } from './LeaveApprovalDetail';

const config: SingleConfig<ILeaveRequestDetail, LeaveApprovalDetailProps> = {
  // page info
  page: (props: LeaveApprovalDetailProps) => ({
    uid: AppMenu.LeaveApproval,
    parentUid: AppMenu.Leave,
    title: props.intl.formatMessage(leaveMessage.approval.page.detailTitle),
    description: props.intl.formatMessage(leaveMessage.approval.page.detailTitle)
  }),

  // parent url
  parentUrl: (props: LeaveApprovalDetailProps) => '/leave/approvals',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LeaveApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LeaveRequestUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: LeaveApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.leaveApprovalState.detail;
    const { loadDetailRequest } = props.leaveApprovalDispatch;

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
  onDataLoaded: (props: LeaveApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (states: LeaveApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.leaveApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ILeaveRequestDetail, props: LeaveApprovalDetailProps) => (
    <LeaveInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ILeaveRequestDetail, props: LeaveApprovalDetailProps) => ([
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
  ])
};

export const LeaveApprovalDetailView: React.SFC<LeaveApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);