import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';

import { WorkflowStatusType } from '@common/classes/types';
import { WorkflowApprovalRemarkForm } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { PurchaseInformation } from '@purchase/components/purchaseRequest/detail/shared/PurchaseInformation';
import { PurchaseItemContainer } from '@purchase/components/purchaseRequest/detail/shared/PurchaseItemContainer';
import { PurchaseApprovalDetailProps } from './PurchaseApprovalDetail';

export const PurchaseApprovalDetailView: React.SFC<PurchaseApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.PurchaseApproval,
      parentUid: AppMenu.Purchase,
      parentUrl: props.location.state && props.location.state.financeUid ? `/finance/approvals/${props.location.state.financeUid}` : '/purchase/approvals',
      title: props.intl.formatMessage(purchaseMessage.approval.pages.detailTitle),
      description: props.intl.formatMessage(purchaseMessage.approval.pages.detailSubHeader)
    }}
    options={props.pageOptions}
    state={props.purchaseApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IPurchaseDetail) => (
      <PurchaseInformation data={data} />
    )}
    secondary={(data: IPurchaseDetail) => ([
      <PurchaseItemContainer data={data} />,
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
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
  />
);