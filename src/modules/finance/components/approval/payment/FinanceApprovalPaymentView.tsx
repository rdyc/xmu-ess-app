import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ProjectUserAction } from '@project/classes/types';
import * as React from 'react';

import { IFinanceDetail } from '@finance/classes/response';
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
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: FinanceApprovalPaymentProps) => {
    const { handleLoadData } = props;
    const { isLoading, response } = props.financeApprovalState.all;

    if (!isLoading && response && response.data) {
      handleLoadData(response.data);
    }
  },
  onUpdated: () => {
    // nope
  },

  // primary
  primaryComponent: (data: IFinanceDetail, props: FinanceApprovalPaymentProps) => (
    <FinanceBulkInformation 
      data={props.finances} 
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IFinanceDetail, props: FinanceApprovalPaymentProps) => ([
    <FinanceBulkInformation 
      data={props.finances} 
    />,
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
  />
);