import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { PurchaseSettlementDetailProps } from './PurchaseSettlementDetail';
import { SettlementInformation } from './shared/SettlementInformation';
import { SettlementItemContainer } from './shared/SettlementItemContainer';

export const PurchaseSettlementDetailView: React.SFC<PurchaseSettlementDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.PurchaseSettlementRequest,
      parentUid: AppMenu.Purchase,
      parentUrl: '/purchase/settlement/requests',
      title: props.intl.formatMessage(purchaseMessage.settlement.pages.detailTitle),
      description: props.intl.formatMessage(purchaseMessage.settlement.pages.detailSubHeader)
    }}
    state={props.purchaseSettlementState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ISettlementDetail) => (
      <SettlementInformation data={data} />
    )}
    secondary={(data: ISettlementDetail) => ([
      <SettlementItemContainer data={data} />,
      <WorkflowHistory data={data.workflow} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="purchase-settlement-option"
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