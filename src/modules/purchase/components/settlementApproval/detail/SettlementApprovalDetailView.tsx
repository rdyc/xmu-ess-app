import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalRemarkForm } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { SettlementInformation } from '@purchase/components/purchaseSettlement/detail/shared/SettlementInformation';
import { SettlementItemContainer } from '@purchase/components/purchaseSettlement/detail/shared/SettlementItemContainer';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { SettlementApprovalDetailProps } from './SettlementApprovalDetail';

export const SettlementApprovalDetailView: React.SFC<SettlementApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.PurchaseSettlementApproval,
      parentUid: AppMenu.Purchase,
      parentUrl: props.location.state && props.location.state.financeUid ? `/finance/approvals/${props.location.state.financeUid}` : '/purchase/settlement/approvals',
      title: props.intl.formatMessage(purchaseMessage.s_approval.pages.detailTitle),
      description: props.intl.formatMessage(purchaseMessage.s_approval.pages.detailSubHeader)
    }}
    state={props.settlementApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ISettlementDetail) => ([
      <SettlementInformation data={data} />
    ])}
    secondary={(data: ISettlementDetail) => ([
      <SettlementItemContainer data={data} />
    ])}
    tertiary={(data: ISettlementDetail) => ([
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
          data.statusType !== WorkflowStatusType.AdjustmentNeeded &&
          data.statusType !== WorkflowStatusType.Rejected &&
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
            approvalRemarkLabel={props.intl.formatMessage(purchaseMessage.request.field.reason)}
            approvalRemarkPlaceholder={props.intl.formatMessage(purchaseMessage.request.field.reasonPlaceholder)}
            approvalOptionalRemarkLabel={props.intl.formatMessage(purchaseMessage.request.field.approveNotes)}
            approvalOptionalRemarkPlaceholder={props.intl.formatMessage(purchaseMessage.request.field.approveNotesPlaceholder)}
          />
        }
      </React.Fragment>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="purchase-settlement-approval-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);