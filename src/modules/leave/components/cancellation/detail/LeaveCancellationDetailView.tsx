
import { LeaveCancellationForm } from '@leave/components/cancellation/form/LeaveCancellationForm';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { Grid, Typography } from '@material-ui/core';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { LeaveCancellationDetailProps } from './LeaveCancellationDetail';

export const LeaveCancellationDetailView: React.SFC<LeaveCancellationDetailProps> = props => {
  const { 
    cancellationTitle, cancellationSubHeader, 
    cancellationDialogTitle, cancellationDialogContentText, cancellationDialogCancelText, cancellationDialogConfirmedText 
  } = props;
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.leaveCancellationState.detail;

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        !isLoading &&
        response && 
        response.data &&
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <LeaveInformation data={response.data}/>
          </Grid>        

          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              <Grid item>
                <WorkflowHistory data={response.data.workflow} />
              </Grid>

              {
                response.data.workflow &&
                <Grid item>
                  <LeaveCancellationForm
                    cancellationTitle={cancellationTitle}
                    cancellationSubHeader={cancellationSubHeader}
                    cancellationDialogTitle={cancellationDialogTitle}
                    cancellationDialogContentText={cancellationDialogContentText}
                    cancellationDialogCancelText={cancellationDialogCancelText}
                    cancellationDialogConfirmedText={cancellationDialogConfirmedText}
                    validate={handleValidate}
                    onSubmit={handleSubmit} 
                    onSubmitSuccess={handleSubmitSuccess}
                    onSubmitFail={handleSubmitFail}
                  />
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );

  return render;
};