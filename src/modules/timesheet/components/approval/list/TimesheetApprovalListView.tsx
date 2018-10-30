import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { ITimesheet } from '@timesheet/classes/response';
import { ApprovalListProps } from '@timesheet/components/approval/list/TimesheetApprovalList';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

export const TimesheetApprovalListView: React.SFC<ApprovalListProps> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.timesheetApprovalState.all;

  const renderTimesheetApprovalList = (timesheets: ITimesheet[]) => {
    const len = timesheets.length - 1;

    return (
      timesheets.map((timesheet, i) =>
        <div key={timesheet.uid}>
          <ListItem
            button={!isLoading}
            key={timesheet.uid}
            onClick={() => handleGoToDetail(timesheet.uid)}
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
          {len !== i && <Divider />}
        </div>
      )
    );
  };

  const RenderList = () => (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
        >
          {
            response &&
            response.metadata &&
            response.metadata.paginate &&
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                      <FormattedPlural one="timesheet" other="timesheets" value={response.metadata.total} />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" align="right" color="primary">
                  <FormattedNumber value={response.metadata.paginate.current} /> of <FormattedNumber value={response.metadata.paginate.total} />
                </Typography>
              </Grid>
            </Grid>
          }
        </ListSubheader>
      }
    >
      {
        response &&
        isArray(response.data) &&
        renderTimesheetApprovalList(response.data)
      }
    </List>
  );

  const render = (
    <React.Fragment>
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
        >
        <RenderList/>
        </Paper>}
    </React.Fragment>
  );

  return render;
};