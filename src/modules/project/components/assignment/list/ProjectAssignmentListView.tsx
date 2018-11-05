import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { IProjectAssignment } from '@project/classes/response';
import { ProjectAssignmentListProps } from '@project/components/assignment/list/ProjectAssignmentList';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

export const ProjectAssignmentListView: React.SFC<ProjectAssignmentListProps> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.projectAssignmentState.all;

  const renderList = (assignments: IProjectAssignment[]) => {
    const len = assignments.length - 1;

    return (
      assignments.map((item, i) => 
        <div key={item.uid}>
          <ListItem 
            button={!isLoading} 
            key={item.uid}
            onClick={() => handleGoToDetail(item.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {item.name}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {item.customer && item.customer.name} {item.contractNumber && ` (PO: ${item.contractNumber})`}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {item.uid} &bull; {item.projectUid} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={item.start || ''} 
                  />
                  &nbsp;to&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={item.end || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {item.project && item.project.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(item.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="project" other="projects" value={response.metadata.total} />
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
        renderList(response.data)
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
