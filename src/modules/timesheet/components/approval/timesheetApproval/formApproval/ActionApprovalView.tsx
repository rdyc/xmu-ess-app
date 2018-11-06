import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ITimesheet } from '@timesheet/classes/response';
import { ApprovalTimesheetsProps } from '@timesheet/components/approval/timesheetApproval/formApproval/ActionApproval';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import {
  FormattedDate, FormattedMessage
} from 'react-intl';

export const actionApprovalView: React.SFC<ApprovalTimesheetsProps> = props => {
  const {
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue,
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText,
    handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, timesheets
  } = props;

  const renderDetails = (_timesheets: ITimesheet[] | null | undefined) => {
    return (
      timesheets && timesheets.map(timesheet => timesheet &&
          <ListItem 
           key={timesheet.uid}
           button
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {timesheet.uid}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {timesheet.employee && timesheet.employee.fullName} &nbsp; &bull; &nbsp;
                  <FormattedDate
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={timesheet.date || ''}
                  />
                </Typography>
                <Typography
                  noWrap
                  color="textSecondary"
                  variant="caption"
                >
                  {timesheet.customer && timesheet.customer.name} &bull; {timesheet.project && timesheet.project.name}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {timesheet.status && timesheet.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(timesheet.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {timesheet.changes && moment(timesheet.changes.updatedAt ? timesheet.changes.updatedAt : timesheet.changes.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
      )
    );
  };

  const render = (
    <React.Fragment>
      {
        <Grid
          container
          spacing={16}
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Card square>
              <CardHeader
                title={<FormattedMessage id="timesheet.infoTitle" />}
                subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
              />
              <CardContent>
                <List>
                {
                  timesheets &&
                  renderDetails(timesheets)
                }
                </List>
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