import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalRemarkForm } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelSettlementRequestDetail } from '@travel/classes/response';
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

export const TravelSettlementApprovalDetailViews: React.SFC<TravelSettlementApprovalDetailProps> = props => {
  const render = (
    <PreviewPage
      info={{
        uid: AppMenu.TravelSettlementApproval,
        parentUid: AppMenu.Travel,
        parentUrl: parentUrl(props),
        title: props.intl.formatMessage(travelMessage.settlementApproval.page.detailTitle),
        description: props.intl.formatMessage(travelMessage.settlementApproval.page.detailTitle)
      }}
      state={props.travelSettlementApprovalState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: ITravelSettlementRequestDetail) => ([
        <TravelSettlementSummary data={data.settlement} travelData={data.request} />,
        <WorkflowHistory data={data.settlement.workflow} />,
        <React.Fragment>
          {
            data.settlement.workflow &&
            data.settlement.status && data.settlement.status.type !== WorkflowStatusType.AdjustmentNeeded &&
            data.settlement.workflow.isApproval &&
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
      secondary={(data: ITravelSettlementRequestDetail) => ([
        <TravelRequestItem data={data.request && data.request.items} />,
        <React.Fragment>
          {
            data.request &&
            <TravelInformation data={data.request} />
          }
        </React.Fragment>
      ])}
      tertiary={(data: ITravelSettlementRequestDetail) => ([
        <TravelSettlementItem data={data.settlement.items} />,
        <TravelSettlementInformation data={data.settlement} />
      ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu 
          id="travel-settlement-approval-option"
          selectable={false}
          menuOptions={props.menuOptions} 
          onSelected={props.handleOnSelectedMenu} 
        />
      }
    />
  );

  return render;
};