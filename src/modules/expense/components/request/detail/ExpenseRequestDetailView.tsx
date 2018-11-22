import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { IExpenseDetail } from '@expense/classes/response';
import { ExpenseUserAction } from '@expense/classes/types';
import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
import { expenseMessages } from '@expense/locales/messages/expenseMessages';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { ExpenseRequestDetailProps } from './ExpenseRequestDetail';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<IExpenseDetail, ExpenseRequestDetailProps> = {
  // page info
  page: (props: ExpenseRequestDetailProps) => ({
    uid: AppMenu.ExpenseRequest,
    parentUid: AppMenu.Expense,
    title: props.intl.formatMessage(expenseMessages.request.page.detailTitle),
    description : props.intl.formatMessage(expenseMessages.request.page.detailSubTitle)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ExpenseRequestDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ExpenseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: ExpenseUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress ]),
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: ExpenseRequestDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.expenseRequestState.detail;
    const { loadDetailRequest } = props.expenseRequestDispatch;

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
  onUpdated: (states: ExpenseRequestDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.expenseRequestState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IExpenseDetail, props: ExpenseRequestDetailProps) => (
    <ExpenseInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IExpenseDetail, props: ExpenseRequestDetailProps) => ([
    <WorkflowHistory data={data.workflow} />
  ])
};

export const ExpenseRequestDetailView: React.SFC<ExpenseRequestDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
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
  </SinglePage>
);