import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowApprovalRemarkForm } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelSettlementDetail } from '@travel/classes/response';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { TravelSettlementInformation } from '@travel/components/settlement/detail/shared/TravelSettlementInformation';
import { TravelSettlementItem } from '@travel/components/settlement/detail/shared/TravelSettlementItem';
import { TravelSettlementSummary } from '@travel/components/settlement/detail/shared/TravelSettlementSummary';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSettlementApprovalDetailProps } from './TravelSettlementApprovalDetails';

const parentUrl = (props: TravelSettlementApprovalDetailProps) => {
  let path = '';
  if (props.location.state && props.location.state.financeUid) {
    path = `/finance/approvals/${props.location.state.financeUid}`;
  } else {
    path = '/travel/settlement/approvals';
  }
  return path;
};

export const TravelSettlementApprovalDetailViews: React.SFC<TravelSettlementApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TravelSettlementApproval,
      parentUid: AppMenu.Travel,
      parentUrl: parentUrl(props),
      title: props.intl.formatMessage(travelMessage.settlementApproval.page.detailTitle),
      description: props.intl.formatMessage(travelMessage.settlementApproval.page.detailTitle)
    }}
    options={props.pageOptions}
    state={props.travelSettlementApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITravelSettlementDetail) => (
      <TravelSettlementSummary
        data={data}
        travelData={props.travelApprovalState.detail.response && props.travelApprovalState.detail.response.data}
      />
    )}
    secondary={(data: ITravelSettlementDetail) => ([
      <TravelSettlementItem data={data.items} />,
      <TravelRequestItem data={props.travelApprovalState.detail.response && props.travelApprovalState.detail.response.data.items} />,
      <TravelSettlementInformation data={data} />,
      <TravelInformation data={props.travelApprovalState.detail.response && props.travelApprovalState.detail.response.data} />,
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
          data.workflow &&
          data.workflow.isApproval &&
          <WorkflowApprovalRemarkForm
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
            approvalRemarkLabel={props.intl.formatMessage(travelMessage.settlementApproval.option.adjustmentNote)}
            approvalRemarkPlaceholder={props.intl.formatMessage(travelMessage.settlementApproval.option.adjustmentNeededPlaceholder)}
            approvalOptionalRemarkLabel={props.intl.formatMessage(travelMessage.settlementApproval.option.approveNotes)}
            approvalOptionalRemarkPlaceholder={props.intl.formatMessage(travelMessage.settlementApproval.option.approveNotesPlaceholder)}
          />
        }
      </React.Fragment>
    ])}
  />
);