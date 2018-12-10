import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import * as React from 'react';

import { FinanceStatusType } from '@common/classes/types';
import { IFinanceDetail } from '@finance/classes/response';
import { FinanceUserAction } from '@finance/classes/types';
import { financeMessage } from '@finance/locales/messages/financeMessage';
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

const config: SingleConfig<IFinanceDetail, FinanceApprovalDetailProps> = {
  // page info
  page: (props: FinanceApprovalDetailProps) => ({
    uid: AppMenu.FinanceApproval,
    parentUid: AppMenu.Finance,
    title: props.intl.formatMessage(financeMessage.approval.page.detailTitle),
    description: props.intl.formatMessage(financeMessage.approval.page.detailSubTitle)
  }),

  // parent url
  parentUrl: (props: FinanceApprovalDetailProps) => '/finance/approvals',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: FinanceApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: FinanceUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
  ]),

  // events
  onDataLoad: (props: FinanceApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.financeApprovalState.detail;
    const { loadDetailRequest } = props.financeApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.financeUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.financeUid !== props.match.params.financeUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          financeUid: props.match.params.financeUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onDataLoaded: (props: FinanceApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (props: FinanceApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.financeApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IFinanceDetail, props: FinanceApprovalDetailProps) => (
    <FinanceInformation 
      data={data} 
      handleToDocument={props.handleToDocument}
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IFinanceDetail, props: FinanceApprovalDetailProps) => ([
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
};

export const FinanceApprovalDetailView: React.SFC<FinanceApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  >
  </SinglePage>
);