import AppMenu from '@constants/AppMenu';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
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
            title={props.approvalTitle}
            statusTypes={props.approvalStatusTypes}
            trueTypes={props.approvalTrueValues}
            remarkFieldProps={{
              label: props.approvalRemarkLabel,
              placeholder: props.approvalRemarkPlaceholder
            }}
            confirmationDialogProps={{
              title: props.approvalDialogTitle,
              message: props.approvalDialogContentText,
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            }}
            onSubmit={props.handleOnSubmit}
        />
        }
      </React.Fragment>,
    ])
    }
  />
);