import { IBaseChanges, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ILeaveRequestGetAllRequest } from '@leave/classes/queries';
import { ILeaveRequest } from '@leave/classes/response';
import { Divider, Grid, List, ListItem, ListSubheader, Typography, WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { isArray } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  leaveRequestState: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeaveRequest>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;
                
export const LeaveRequestListComponent: React.ComponentType<AllProps> = props => {
  const { history  } = props;
  const { response, isLoading  } = props.leaveRequestState;

  const handleClick = (leaveUid: string) => {
    if (!isLoading) {
      history.push(`/leave/details/${leaveUid}`);
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

  const renderLeaveRequestList = (leaveRequests: ILeaveRequest[]) => {
    const len = leaveRequests.length - 1;

    return (
      leaveRequests.map((leaveRequest, i) => 
        <div key={leaveRequest.uid}>
          <ListItem 
            button={!isLoading} 
            key={leaveRequest.uid} 
            onClick={() => handleClick(leaveRequest.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {leaveRequest.leaveType}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >

                  {leaveRequest.uid} &bull; {leaveRequest.leave && leaveRequest.leave.value} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={leaveRequest.start || ''} 
                  />
                  &nbsp;to&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={leaveRequest.end || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {leaveRequest.status && leaveRequest.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(leaveRequest.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {leaveRequest.changes && moment(leaveRequest.changes.updatedAt ? leaveRequest.changes.updatedAt : leaveRequest.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="leaveRequest" other="leaveRequests" value={response.metadata.total} />
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
        renderLeaveRequestList(response.data)
      }
    </List>
  );
};