import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { PurchaseRequestDetailProps } from './PurchaseRequestDetail';
import { PurchaseInformation } from './shared/PurchaseInformation';
import { PurchaseItemContainer } from './shared/PurchaseItemContainer';

export const PurchaseRequestDetailView: React.SFC<PurchaseRequestDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.PurchaseRequest,
      parentUid: AppMenu.Purchase,
      parentUrl: '/purchase/requests',
      title: props.intl.formatMessage(purchaseMessage.request.pages.detailTitle),
      description: props.intl.formatMessage(purchaseMessage.request.pages.detailSubHeader)
    }}
    state={props.purchaseRequestState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IPurchaseDetail) => (
      <PurchaseInformation data={data} />
    )}
    secondary={(data: IPurchaseDetail) => ([
      <PurchaseItemContainer data={data} />,
      <WorkflowHistory data={data.workflow} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="purchase-request-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
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