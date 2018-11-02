import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  // List,
  // ListItem,
  Typography,
} from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
// import { ITimesheetDetail } from '@timesheet/classes/response';
import { ApprovalTimesheetsProps } from '@timesheet/components/approval/timesheetApproval/formApproval/ActionApproval';
// import { ITimesheetDetail } from '@timesheet/classes/response';
// import { parseChanges } from '@utils/parseChanges';
// import * as moment from 'moment';
import * as React from 'react';
import {
  // FormattedDate,
  FormattedMessage
} from 'react-intl';

export const actionApprovalView: React.SFC<ApprovalTimesheetsProps> = props => {
  const {
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue,
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText,
    handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, timesheetUids,
  } = props;

  const render = (
    <React.Fragment>
      {
        <Grid
          container
          spacing={16}
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Card square>
              <CardHeader
                title={<FormattedMessage id="timesheet.infoTitle" />}
                subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
              />
              <CardContent>
                <Typography>
                  {timesheetUids}
                </Typography>
                {/* <List>
                {
                  timesheets &&
                  renderDetails(s)
                }
                </List> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              <Grid item>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
  return render;
};