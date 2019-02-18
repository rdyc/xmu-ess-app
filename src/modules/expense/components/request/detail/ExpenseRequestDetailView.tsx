import AppMenu from '@constants/AppMenu';
import { IExpenseDetail } from '@expense/classes/response';
import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { ExpenseRequestDetailProps } from './ExpenseRequestDetail';

export const ExpenseRequestDetailView: React.SFC<ExpenseRequestDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      title: props.intl.formatMessage(expenseMessage.request.page.detailTitle),
      description : props.intl.formatMessage(expenseMessage.request.page.detailSubTitle)
    }}
    options={props.pageOptions}
    state={props.expenseRequestState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IExpenseDetail) => (
      <ExpenseInformation data={data} />
    )}
    secondary={(data: IExpenseDetail) => ([
      <WorkflowHistory data={data.workflow} />
    ])}
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