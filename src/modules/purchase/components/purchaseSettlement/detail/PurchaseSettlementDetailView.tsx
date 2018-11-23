import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseUserAction } from '@purchase/classes/types';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { PurchaseSettlementDetailProps } from './PurchaseSettlementDetail';
import { SettlementInformation } from './shared/SettlementInformation';
import { SettlementItemContainer } from './shared/SettlementItemContainer';
// import { PurchaseItemInformation } from './shared/PurchaseItemInformation';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => {
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const isSettle = (statusType: WorkflowStatusType | undefined, statusTypes: string | null): boolean => {
  return statusType ? false : true;
};

const config: SingleConfig<ISettlementDetail, PurchaseSettlementDetailProps> = {
  // page info
  page: (props: PurchaseSettlementDetailProps) => ({
    uid: AppMenu.PurchaseSettlementRequest,
    parentUid: AppMenu.Purchase,
    title: props.intl.formatMessage(purchaseMessage.settlement.pages.detailTitle),
    description: props.intl.formatMessage(purchaseMessage.settlement.pages.detailSubHeader)
  }),
  // action centre
  showActionCentre: true,
  // more
  hasMore: true,
  moreOptions: (props: PurchaseSettlementDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: PurchaseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: PurchaseUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: isContains(state.statusType, [WorkflowStatusType.Submitted, WorkflowStatusType.InProgress]),
      onClick: props.handlePurchaseModify
    },
    {
      id: PurchaseUserAction.Settle,
      name: props.intl.formatMessage(purchaseMessage.action.settle),
      enabled: true,
      visible: isSettle(state.statusType, null),
      onClick: props.handlePurchaseSettle
    }
  ]),
  onDataLoad: (props: PurchaseSettlementDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.purchaseSettlementState.detail;
    const { loadDetailRequest } = props.purchaseSettlementDispatch;

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
  onUpdated: (states: PurchaseSettlementDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.purchaseSettlementState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType || '');
    }
  },

  // primary
  primaryComponent: (data: ISettlementDetail, props: PurchaseSettlementDetailProps) => (
    <SettlementInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ISettlementDetail, props: PurchaseSettlementDetailProps) => ([
    <SettlementItemContainer data={data} />,
    <WorkflowHistory data={data.workflow} />
  ])
};

export const PurchaseSettlementDetailView: React.SFC<PurchaseSettlementDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
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
  </SinglePage>
);