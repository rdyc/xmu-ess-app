import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalRemarkForm } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';

import { ITravelSettlementDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { TravelSettlementInformation } from '@travel/components/settlement/detail/shared/TravelSettlementInformation';
import { TravelSettlementItem } from '@travel/components/settlement/detail/shared/TravelSettlementItem';
import { TravelSettlementSummary } from '@travel/components/settlement/detail/shared/TravelSettlementSummary';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { TravelSettlementApprovalDetailProps } from './TravelSettlementApprovalDetails';

const config: SingleConfig<ITravelSettlementDetail, TravelSettlementApprovalDetailProps> = {
  // page info
  page: (props: TravelSettlementApprovalDetailProps) => ({
    uid: AppMenu.TravelSettlementApproval,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.settlementApproval.page.detailTitle),
    description: props.intl.formatMessage(travelMessage.settlementApproval.page.detailTitle)
  }),

  // parent url
  parentUrl: (props: TravelSettlementApprovalDetailProps) => {
    let path = '';
    if (props.location.state && props.location.state.financeUid) {
      path = `/finance/approvals/${props.location.state.financeUid}`;
    } else {
      path = '/travel/settlement/approvals';
    }
    return path;
  },
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TravelSettlementApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TravelUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: TravelSettlementApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.travelSettlementApprovalState.detail;
    const { loadDetailRequest } = props.travelSettlementApprovalDispatch;

    // when user is set and not loading and has travelUid in route params
    if (user && !isLoading && props.match.params.travelSettlementUid) {
      // when travelUid was changed or response are empty or force to reload
      if ((request && request.travelSettlementUid !== props.match.params.travelSettlementUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelSettlementUid: props.match.params.travelSettlementUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onDataLoaded: (props: TravelSettlementApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (props: TravelSettlementApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.travelSettlementApprovalState.detail;
    
    // set loading status
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ITravelSettlementDetail, props: TravelSettlementApprovalDetailProps) => (
    <TravelSettlementSummary 
      data={data}
      travelData={props.travelApprovalState.detail.response && props.travelApprovalState.detail.response.data}
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITravelSettlementDetail, props: TravelSettlementApprovalDetailProps) => ([
    <TravelSettlementItem data={data.items} />,
    <TravelRequestItem data={props.travelApprovalState.detail.response && props.travelApprovalState.detail.response.data.items} />,    
    <TravelSettlementInformation data={data} />,
    <TravelInformation data={props.travelApprovalState.detail.response && props.travelApprovalState.detail.response.data} />,
    <WorkflowHistory data={data.workflow} />,
    <React.Fragment>
      {
        data.workflow && 
        data.workflow.isApproval &&
        <WorkflowApprovalRemarkForm
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
          approvalRemarkLabel={props.intl.formatMessage(travelMessage.settlementApproval.option.adjustmentNote)}
          approvalRemarkPlaceholder={props.intl.formatMessage(travelMessage.settlementApproval.option.adjustmentNeededPlaceholder)}          
          approvalOptionalRemarkLabel={props.intl.formatMessage(travelMessage.settlementApproval.option.approveNotes)}
          approvalOptionalRemarkPlaceholder={props.intl.formatMessage(travelMessage.settlementApproval.option.approveNotesPlaceholder)}
        />
      }
    </React.Fragment>
  ])
};

export const TravelSettlementApprovalDetailViews: React.SFC<TravelSettlementApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);