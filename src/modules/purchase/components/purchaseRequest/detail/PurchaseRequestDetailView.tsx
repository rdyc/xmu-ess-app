import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { PurchaseUserAction } from '@purchase/classes/types';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { PurchaseRequestDetailProps } from './PurchaseRequestDetail';
import { PurchaseInformation } from './shared/PurchaseInformation';
import { PurchaseItemContainer } from './shared/PurchaseItemContainer';
// import { PurchaseItemInformation } from './shared/PurchaseItemInformation';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => {
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<IPurchaseDetail, PurchaseRequestDetailProps> = {
   // page info
  page: (props: PurchaseRequestDetailProps) => ({
    uid: AppMenu.PurchaseRequest,
    parentUid: AppMenu.Purchase,
    title: props.intl.formatMessage(purchaseMessage.request.pages.detailTitle),
    description: props.intl.formatMessage(purchaseMessage.request.pages.detailSubHeader)
  }),
  // action centre
  showActionCentre: true,
  // more
  hasMore: true,
  moreOptions: (props: PurchaseRequestDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
    }
  ]),
  onDataLoad: (props: PurchaseRequestDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.purchaseRequestState.detail;
    const { loadDetailRequest } = props.purchaseRequestDispatch;

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
  onUpdated: (states: PurchaseRequestDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.purchaseRequestState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType || '');
    }
  },

  // primary
  primaryComponent: (data: IPurchaseDetail, props: PurchaseRequestDetailProps) => (
    <PurchaseInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IPurchaseDetail, props: PurchaseRequestDetailProps) => ([
    <PurchaseItemContainer data={data} />,
    <WorkflowHistory data={data.workflow} />
  ])
};

export const PurchaseRequestDetailView: React.SFC<PurchaseRequestDetailProps> = props => (
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