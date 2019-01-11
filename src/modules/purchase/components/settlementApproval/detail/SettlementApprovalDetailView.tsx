import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseUserAction } from '@purchase/classes/types';
import { SettlementInformation } from '@purchase/components/purchaseSettlement/detail/shared/SettlementInformation';
import { SettlementItemContainer } from '@purchase/components/purchaseSettlement/detail/shared/SettlementItemContainer';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { SettlementApprovalDetailProps } from './SettlementApprovalDetail';

const config: SingleConfig<ISettlementDetail, SettlementApprovalDetailProps> = {
  // page info
  page: (props: SettlementApprovalDetailProps) => ({
    uid: AppMenu.PurchaseSettlementApproval,
    parentUid: AppMenu.Purchase,
    title: props.intl.formatMessage(purchaseMessage.s_approval.pages.detailTitle),
    // description: props.intl.formatMessage(purchaseMessage.s_approval.pages.detailTitle)
    description: ''
  }),
  
  // parent url
  parentUrl: (props: SettlementApprovalDetailProps) => {
    let path = '';
    if (props.location.state && props.location.state.financeUid) {
      path = `/finance/approvals/${props.location.state.financeUid}`;
    } else {
      path = '/purchase/settlement/approvals';
    }
    return path;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: SettlementApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: PurchaseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: SettlementApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.settlementApprovalState.detail;
    const { loadDetailRequest } = props.settlementApprovalDispatch;

    // when user is set and not loading and has purchaseUid in route params
    if (user && !isLoading && props.match.params.purchaseUid) {
      // when purchaseUid was changed or response are empty or force to reload
      if ((request && request.purchaseUid !== props.match.params.purchaseUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          purchaseUid: props.match.params.purchaseUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType || '');
      }
    }
  },
  onDataLoaded: (props: SettlementApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (props: SettlementApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.settlementApprovalState.detail;

    // set loading status
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType || '');
    }
  },

  // primary
  primaryComponent: (data: ISettlementDetail, props: SettlementApprovalDetailProps) => (
    <SettlementInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ISettlementDetail, props: SettlementApprovalDetailProps) => ([
    <SettlementItemContainer data={data} />,
    <WorkflowHistory data={data.workflow} />,
    <React.Fragment>
      { 
        data.statusType !== WorkflowStatusType.AdjustmentNeeded &&
        data.statusType !== WorkflowStatusType.Rejected &&
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
          approvalRemarkLabel={props.intl.formatMessage(purchaseMessage.settlement.field.adjustmentNote)}
          approvalRemarkPlaceholder={props.intl.formatMessage(purchaseMessage.settlement.field.adjustmentNotePlaceholder)}
        />
      }
    </React.Fragment>
  ])
};

export const SettlementApprovalDetailView: React.SFC<SettlementApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);