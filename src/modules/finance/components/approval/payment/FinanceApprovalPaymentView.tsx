import AppMenu from '@constants/AppMenu';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import * as React from 'react';
import { FinanceBulkInformation } from '../detail/shared/FinanceBulkInformation';
import { FinanceApprovalPaymentProps } from './FinanceApprovalPayment';

export const FinanceApprovalPaymentView: React.SFC<FinanceApprovalPaymentProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.FinanceApproval,
      parentUid: AppMenu.Finance,
      title: props.intl.formatMessage(financeMessage.approval.page.detailTitle),
      description: props.intl.formatMessage(financeMessage.approval.page.detailSubTitle)
    }}
    state={props.financeApprovalState.detail}
    onLoadApi={props.handleLoadData}
    primary={() => (
      <FinanceBulkInformation 
      data={props.finances} 
    />
    )}
    secondary={() => ([
      <React.Fragment>
        {
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
            approvalRemarkLabel={props.approvalRemarkLabel}
            approvalRemarkPlaceholder={props.approvalRemarkPlaceholder}
          />
        }
      </React.Fragment>,
    ])
    }
  />
);