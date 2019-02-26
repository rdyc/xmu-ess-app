import AppMenu from '@constants/AppMenu';
import { IExpenseDetail } from '@expense/classes/response';
import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { ExpenseApprovalDetailProps } from './ExpenseApprovalDetail';

const parentUrl = (props: ExpenseApprovalDetailProps): string => {
  let path = '';
  if (props.location.state && props.location.state.financeUid) {
    path = `/finance/approvals/${props.location.state.financeUid}`;
  } else {
    path = '/expense/approvals';
  }
  return path;
};

export const ExpenseApprovalDetailView: React.SFC<ExpenseApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ExpenseApproval,
      parentUid: AppMenu.Expense,
      parentUrl: parentUrl(props),
      title: props.intl.formatMessage(expenseMessage.request.page.detailTitle),
      description : props.intl.formatMessage(expenseMessage.request.page.detailSubTitle)
    }}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="expense-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
    state={props.expenseApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IExpenseDetail) => (
      <ExpenseInformation data={data} />
    )}
    secondary={(data: IExpenseDetail) => ([
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
          data.workflow && 
          data.workflow.isApproval &&
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
          />
        }
      </React.Fragment>
    ])}
  />
);