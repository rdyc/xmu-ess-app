import { FinanceStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { IFinanceDetail } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import * as React from 'react';

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
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="finance-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
    state={props.financeApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IFinanceDetail) => ([
      <FinanceInformation 
        data={data}
        handleToDocument={props.handleToDocument} 
      />
    ])}
    secondary={(data: IFinanceDetail) => ([
      <React.Fragment>
        {
          isApproval(data.statusType) &&
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