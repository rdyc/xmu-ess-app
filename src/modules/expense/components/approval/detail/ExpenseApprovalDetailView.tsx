import AppMenu from '@constants/AppMenu';
import { IExpenseDetail } from '@expense/classes/response';
import { ExpenseUserAction } from '@expense/classes/types';
import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { ExpenseApprovalDetailProps } from './ExpenseApprovalDetail';

const config: SingleConfig<IExpenseDetail, ExpenseApprovalDetailProps> = {
  // page info
  page: (props: ExpenseApprovalDetailProps) => ({
    uid: AppMenu.ExpenseRequest,
    parentUid: AppMenu.Expense,
    title: props.intl.formatMessage(expenseMessage.request.page.detailTitle),
    description : props.intl.formatMessage(expenseMessage.request.page.detailSubTitle)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ExpenseApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ExpenseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: ExpenseApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.expenseApprovalState.detail;
    const { loadDetailRequest } = props.expenseApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.expenseUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.expenseUid !== props.match.params.expenseUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          expenseUid: props.match.params.expenseUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onDataLoaded: (props: ExpenseApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (states: ExpenseApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.expenseApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IExpenseDetail) => (
    <ExpenseInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IExpenseDetail, props: ExpenseApprovalDetailProps) => ([
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
  ])
};

export const ExpenseApprovalDetailView: React.SFC<ExpenseApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);