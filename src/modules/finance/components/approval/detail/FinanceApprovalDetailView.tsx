import AppMenu from '@constants/AppMenu';
import * as React from 'react';

import { FinanceStatusType } from '@common/classes/types';
import { IFinanceDetail } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { FinanceApprovalDetailProps } from './FinanceApprovalDetail';
import { FinanceInformation } from './shared/FinanceInformation';

const isApproval = (status: string): boolean => {
  let result = false;

  if (status === FinanceStatusType.Approved || status === FinanceStatusType.Hold) {
    result = true;
  }

  return result;
};

export const FinanceApprovalDetailView: React.SFC<FinanceApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.FinanceApproval,
      parentUid: AppMenu.Finance,
      parentUrl: '/finance/approvals',
      title: props.intl.formatMessage(financeMessage.approval.page.detailTitle),
      description: props.intl.formatMessage(financeMessage.approval.page.detailSubTitle)
    }}
    options={props.pageOptions}
    state={props.financeApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IFinanceDetail) => (
      <FinanceInformation 
        data={data}
        handleToDocument={props.handleToDocument} 
      />
    )}
    secondary={(data: IFinanceDetail) => ([
      <React.Fragment>
        {
          isApproval(data.statusType) &&
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