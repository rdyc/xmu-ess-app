import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { Grid } from '@material-ui/core';
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
    options={props.pageOptions}
    state={props.travelApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITravelRequestDetail) => (
      <React.Fragment>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <TravelRequestSummary data={data} />
          </Grid>
          <Grid item xs={12}>
            <TravelInformation data={data} />
          </Grid>
        </Grid>
      </React.Fragment>
    )}
    secondary={(data: ITravelRequestDetail) => ([
      <TravelRequestItem data={data.items} />,
      <React.Fragment>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} >
            <WorkflowHistory data={data.workflow} />
          </Grid>
          <Grid item xs={12} >
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
          </Grid>
        </Grid>
      </React.Fragment>
    ])}
  />
);