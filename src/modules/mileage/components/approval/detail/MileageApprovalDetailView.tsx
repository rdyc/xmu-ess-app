import { Grid, Typography } from '@material-ui/core';
import { MileageApprovalDetailProps } from '@mileage/components/approval/detail/MileageApprovalDetail';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const MileageApprovalDetailView: React.SFC<
  MileageApprovalDetailProps
> = props => {
  const {
    approvalTitle,
    approvalSubHeader,
    approvalChoices,
    approvalTrueValue,
    approvalDialogTitle,
    approvalDialogContentText,
    approvalDialogCancelText,
    approvalDialogConfirmedText
  } = props;
  const {
    handleValidate,
    handleSubmit,
    handleSubmitSuccess,
    handleSubmitFail
  } = props;
  const { isLoading, response } = props.mileageApprovalState.detail;

  const render = (
    <React.Fragment>
      {isLoading && (
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      )}
      {!isLoading &&
        response &&
        response.data && (
          <Grid container spacing={24}>
            <Grid item xs={12} md={4}>
              <MileageInformation data={response.data} />
            </Grid>
            <Grid item xs={8}>
              {response.data.items && response.data.workflow && (
                <MileageItem items={response.data.items} approval={response.data.workflow.isApproval}/>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8} xl={3}>
              <WorkflowHistory data={response.data.workflow} />
            </Grid>
            <Grid item xs={12} sm={12} md={8} xl={3}>
              {response.data.workflow &&
                response.data.workflow.isApproval && (
                  <WorkflowApprovalForm
                    approvalTitle={approvalTitle}
                    approvalSubHeader={approvalSubHeader}
                    approvalChoices={approvalChoices}
                    approvalTrueValue={approvalTrueValue}
                    approvalDialogTitle={approvalDialogTitle}
                    approvalDialogContentText={approvalDialogContentText}
                    approvalDialogCancelText={approvalDialogCancelText}
                    approvalDialogConfirmedText={approvalDialogConfirmedText}
                    validate={handleValidate}
                    onSubmit={handleSubmit}
                    onSubmitSuccess={handleSubmitSuccess}
                    onSubmitFail={handleSubmitFail}
                  />
                )}
            </Grid>
          </Grid>
        )}
    </React.Fragment>
  );

  return render;
};
