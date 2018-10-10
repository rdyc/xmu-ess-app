import { IBaseChanges, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { Divider, Grid, List, ListItem, ListSubheader, Typography, WithStyles } from '@material-ui/core';
import { ISystemLimitAllRequest } from '@lookup/classes/queries';
import { ISystemLimit } from '@lookup/classes/response';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { isArray } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  systemLimitState: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;
                
export const SystemLimitList: React.ComponentType<AllProps> = props => {
  const { history  } = props;
  const { response, isLoading  } = props.systemLimitState;

  const handleClick = (systemLimitUid: string) => {
    if (!isLoading) {
      history.push(`/systemLimit/details/${systemLimitUid}`);
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

  const renderSystemLimitList = (systemLimits: ISystemLimit[]) => {
    const len = systemLimits.length - 1;

    return (
      systemLimits.map((systemLimit, i) => 
        <div key={systemLimit.uid}>
          <ListItem 
            button={!isLoading} 
            key={systemLimit.uid} 
            onClick={() => handleClick(systemLimit.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {systemLimit.category}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {systemLimit.company}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {systemLimit.days} &bull;
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {systemLimit.days}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(systemLimit.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {systemLimit.changes && moment(systemLimit.changes.updatedAt ? systemLimit.changes.updatedAt : systemLimit.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="systemLimit" other="systemLimits" value={response.metadata.total} />
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
        renderSystemLimitList(response.data)
      }
    </List>
  );
};