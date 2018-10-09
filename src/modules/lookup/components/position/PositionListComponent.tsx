import { IBaseChanges, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IPositionGetAllRequest } from '@lookup/classes/queries';
import { IPosition } from '@lookup/classes/response';
import { Divider, Grid, List, ListItem, ListSubheader, Typography, WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { isArray } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  positionState: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;
                
export const PositionListComponent: React.SFC<AllProps> = props => {
  const { history  } = props;
  const { response, isLoading  } = props.positionState;

  const handleClick = (positionUid: string) => {
    if (!isLoading) {
      history.push(`/position/details/${positionUid}`);
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

  const renderPositionList = (positions: IPosition[]) => {
    const len = positions.length - 1;

    return (
      positions.map((position, i) => 
        <div key={position.uid}>
          <ListItem 
            button={!isLoading} 
            key={position.uid} 
            onClick={() => handleClick(position.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {position.name}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {position.company && position.company.name}
                </Typography>
                {position.inactiveDate ?
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  Valid until&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={position.inactiveDate || ''} 
                  />
                </Typography> :
                <Typography 
                noWrap
                color="textSecondary" 
                variant="caption"
                >
                Valid indefinitely
                </Typography>}
              </Grid>
              <Grid item xs={4} sm={4}>
              {position.isAllowMultiple ?
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  Allow More
                </Typography> :
                <Typography 
                noWrap 
                variant="body1" 
                align="right"
                >
                  Not Allow More
                </Typography>
                }
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(position.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {position.changes && moment(position.changes.updatedAt ? position.changes.updatedAt : position.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="position" other="positions" value={response.metadata.total} />
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
        renderPositionList(response.data)
      }
    </List>
  );
};