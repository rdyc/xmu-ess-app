import { Grid, Typography } from '@material-ui/core';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ApprovalDetailProps } from './TimesheetApprovalDetail';

export const TimesheetApprovalDetailView: React.SFC<ApprovalDetailProps> = props => {
  const { isLoading, response } = props.timesheetApprovalState.detail;

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
            <TimesheetInformation data={response.data}/>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={16}>
              <Grid item>
                <WorkflowHistory data={response.data.workflow} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );

  return render;
};