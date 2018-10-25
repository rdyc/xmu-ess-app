import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { IProject } from '@project/classes/response';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

import { ProjectApprovalListProps } from './ProjectApprovalList';

export const ProjectApprovalListView: React.SFC<ProjectApprovalListProps> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.projectApprovalState.all;

  const renderProjectList = (projects: IProject[]) => {
    const len = projects.length - 1;

    return (
      projects.map((project, i) => 
        <div key={project.uid}>
          <ListItem 
            button={!isLoading} 
            key={project.uid} 
            onClick={() => handleGoToDetail(project.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {project.name}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {project.customer && project.customer.name} &bull; {project.customer && project.customer.company && project.customer.company.name} {project.contractNumber && `(PO: ${project.contractNumber})`}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {project.uid} &bull; {project.project && project.project.value} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={project.start || ''} 
                  />
                  &nbsp;to&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={project.end || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {project.status && project.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(project.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {project.changes && moment(project.changes.updatedAt ? project.changes.updatedAt : project.changes.createdAt).fromNow()}
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
        renderProjectList(response.data)
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