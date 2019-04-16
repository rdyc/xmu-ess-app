import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowApprovalRemarkForm } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelRequestDetail } from '@travel/classes/response';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { TravelRequestSummary } from '@travel/components/request/detail/shared/TravelRequestSummary';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';

import { TravelRequestApprovalDetailProps } from './TravelRequestApprovalDetail';

const parentUrl = (props: TravelRequestApprovalDetailProps) => {
  let path = '';
  if (props.location.state && props.location.state.financeUid) {
    path = `/finance/approvals/${props.location.state.financeUid}`;
  } else {
    path = '/travel/approvals';
  }
  return path;
};

export const TravelRequestApprovalDetailView: React.SFC<TravelRequestApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TravelApproval,
      parentUid: AppMenu.Travel,
      parentUrl: parentUrl(props),
      title: props.intl.formatMessage(travelMessage.requestApproval.page.detailTitle),
      description: props.intl.formatMessage(travelMessage.requestApproval.page.detailTitle)
    }}
    state={props.travelApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITravelRequestDetail) => ([
      <TravelRequestSummary data={data} />,
      <TravelInformation data={data} />
    ])}
    secondary={(data: ITravelRequestDetail) => ([
      <TravelRequestItem data={data.items} />
    ])}
    tertiary={(data: ITravelRequestDetail) => ([
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
            approvalRemarkLabel={props.intl.formatMessage(travelMessage.requestApproval.option.rejectReason)}
            approvalRemarkPlaceholder={props.intl.formatMessage(travelMessage.requestApproval.option.rejectReasonPlaceholder)}
            approvalOptionalRemarkLabel={props.intl.formatMessage(travelMessage.requestApproval.option.approveNote)}
            approvalOptionalRemarkPlaceholder={props.intl.formatMessage(travelMessage.requestApproval.option.approveNotePlaceholder)}
          />
        }
      </React.Fragment>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="travel-request-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  />
);