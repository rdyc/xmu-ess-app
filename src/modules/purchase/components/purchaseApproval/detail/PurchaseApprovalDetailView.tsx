import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseInformation } from '@purchase/components/purchaseRequest/detail/shared/PurchaseInformation';
import { PurchaseItemContainer } from '@purchase/components/purchaseRequest/detail/shared/PurchaseItemContainer';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { PurchaseApprovalDetailProps } from './PurchaseApprovalDetail';

const config: SingleConfig<IPurchaseDetail, PurchaseApprovalDetailProps> = {
  // page info
  page: (props: PurchaseApprovalDetailProps) => ({
    uid: AppMenu.PurchaseApproval,
    parentUid: AppMenu.Purchase,
    title: props.intl.formatMessage(purchaseMessage.approval.pages.detailTitle),
    // description: props.intl.formatMessage(purchaseMessage.approval.pages.detailSubHeader)
    description: ''
  }),

  // parent url
  parentUrl: (props: PurchaseApprovalDetailProps) => {
    let path = '';
    if (props.location.state && props.location.state.financeUid) {
      path = `/finance/approvals/${props.location.state.financeUid}`;
    } else {
      path = '/purchase/approvals';
    }
    return path;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: PurchaseApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: PurchaseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: PurchaseApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.purchaseApprovalState.detail;
    const { loadDetailRequest } = props.purchaseApprovalDispatch;

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
  onDataLoaded: (props: PurchaseApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (props: PurchaseApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.purchaseApprovalState.detail;

    // set loading status
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType || '');
    }
  },

  // primary
  primaryComponent: (data: IPurchaseDetail, props: PurchaseApprovalDetailProps) => (
    <PurchaseInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IPurchaseDetail, props: PurchaseApprovalDetailProps) => ([
    <PurchaseItemContainer data={data} />,
    <WorkflowHistory data={data.workflow} />,
    <React.Fragment>
      {
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
        />
      }
    </React.Fragment>
  ])
};

export const PurchaseApprovalDetailView: React.SFC<PurchaseApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);