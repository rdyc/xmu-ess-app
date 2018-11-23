import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import * as React from 'react';

import { IFinanceDetail } from '@finance/classes/response';
import { FinanceUserAction } from '@finance/classes/types';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { FinanceBulkInformation } from '../detail/shared/FinanceBulkInformation';
import { FinanceApprovalPaymentProps } from './FinanceApprovalPayment';

const config: SingleConfig<IFinanceDetail, FinanceApprovalPaymentProps> = {
  // page info
  page: (props: FinanceApprovalPaymentProps) => ({
    uid: AppMenu.FinanceApproval,
    parentUid: AppMenu.Finance,
    title: props.intl.formatMessage(financeMessage.approval.page.detailTitle),
    description: props.intl.formatMessage(financeMessage.approval.page.detailTitle)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: FinanceApprovalPaymentProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: FinanceUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: FinanceApprovalPaymentProps, callback: SingleHandler, forceReload?: boolean | false) => {
    // fool the system
    const { user } = props.userState;
    const { isLoading, request, response } = props.financeApprovalState.detail;
    const { loadDetailRequest } = props.financeApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.financeUids[0]) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.financeUid !== props.financeUids[0]) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          financeUid: props.financeUids[0]
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }

    // actually pull data from list like a boss
    const { handleLoadData } = props;
    
    handleLoadData();
  },
  onDataLoaded: (props: FinanceApprovalPaymentProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (states: FinanceApprovalPaymentProps, callback: SingleHandler) => {
    const { isLoading, response } = states.financeApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IFinanceDetail, props: FinanceApprovalPaymentProps) => (
    <FinanceBulkInformation 
      data={props.finances} 
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IFinanceDetail, props: FinanceApprovalPaymentProps) => ([
    <React.Fragment>
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
    </React.Fragment>,
  ])
};

export const FinanceApprovalPaymentView: React.SFC<FinanceApprovalPaymentProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);