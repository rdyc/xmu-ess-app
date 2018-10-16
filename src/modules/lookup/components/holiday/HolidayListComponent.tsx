import { IBaseChanges, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IHolidayAllRequest } from '@lookup/classes/queries';
import { IHoliday } from '@lookup/classes/response';
import { Divider, Grid, List, ListItem, ListSubheader, Typography, WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { isArray } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  holidayState: IQueryCollectionState<IHolidayAllRequest, IHoliday>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;

export const HolidayListComponent: React.ComponentType<AllProps> = props => {
  const { history  } = props;
  const { response, isLoading  } = props.holidayState;

  const handleClick = (holidayUid: string) => {
    if (!isLoading) {
      history.push(`/holiday/details/${holidayUid}`);
    } 
  };

  const parseChanges = (changes: IBaseChanges | null) => {
    let result = 'Unknown';
    
    if (!changes) {
      return result;
    }

    if (changes.updatedBy !== null) {
      result = changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
    } else {
      result = changes.created ? changes.created.fullName : changes.createdBy;
    }
    return result;
  };

  const renderHolidayList = (holidays: IHoliday[]) => {
    const len = holidays.length - 1;

    return (
      holidays.map((holiday, i) => 
        <div key={holiday.uid}>
          <ListItem 
            button={!isLoading} 
            key={holiday.uid} 
            onClick={() => handleClick(holiday.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {holiday.description}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {holiday.company && holiday.company.name}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {holiday.uid}
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={holiday.date || ''} 
                  />
                  &nbsp;to&nbsp; 
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {parseChanges(holiday.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {holiday.changes && moment(holiday.changes.updatedAt ? holiday.changes.updatedAt : holiday.changes.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          {len !== i && <Divider />}
        </div>
      )
    );
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
        >
          {
            response &&
            response.metadata && 
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                  <FormattedPlural one="holiday" other="holidays" value={response.metadata.total} />
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
        renderHolidayList(response.data)
      }
    </List>
  );
};