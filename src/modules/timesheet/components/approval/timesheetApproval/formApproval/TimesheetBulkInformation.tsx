import { Card, CardContent, CardHeader, Grid, ListItem, Typography } from '@material-ui/core';
import { ITimesheet } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITimesheet[];
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const timesheetBulkInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(timesheetMessage.entry.section.infoTitle)}
      subheader={props.intl.formatMessage(timesheetMessage.entry.section.infoSubHeader)}
    />
    <CardContent>
      {
        props.data.map(timesheet => timesheet &&
          <ListItem 
           key={timesheet.uid}
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
      }
    </CardContent>
  </Card>
);
export const TimesheetBulkInformation = compose<AllProps, OwnProps>(
  injectIntl
)(timesheetBulkInformation);