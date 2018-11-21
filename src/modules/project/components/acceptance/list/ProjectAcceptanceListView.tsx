import { WorkflowStatusType } from '@common/classes/types';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@material-ui/core';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import { IProjectAssignmentDetail, IProjectAssignmentDetailItem } from '@project/classes/response';
import * as React from 'react';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

import { ProjectAcceptanceListProps } from './ProjectAcceptanceListOld';

export const ProjectAcceptanceListView: React.SFC<ProjectAcceptanceListProps> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.projectAcceptanceState.all;

  const hasPending = (items: IProjectAssignmentDetailItem[] | null): boolean => {
    const { user } = props.userState;

    let result: boolean = false;

    if (user && items) {
      const pendigItems = items.filter(item =>
        item.employeeUid === user.uid &&
        item.statusType === WorkflowStatusType.Submitted
      );

      result = pendigItems.length > 0;
    }

    return result;
  };

  const renderProjectList = (assignments: IProjectAssignmentDetail[]) => (
    <React.Fragment>
      {
        assignments.map((assignment, i) => 
          <React.Fragment key={assignment.uid}>
            <ListItem
              button={!isLoading}
              onClick={() => handleGoToDetail(assignment.uid)}
            >
              <ListItemText 
                primary={`${assignment.customer && assignment.customer.name}`}
                secondary={`${assignment.projectUid} - ${assignment.name} | ${assignment.project && assignment.project.value}`}
                primaryTypographyProps={{
                  noWrap: true,
                  variant: 'body1'
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  variant: 'caption'
                }}
              />
              {
                hasPending(assignment.items) &&
                <ListItemIcon>
                  <NotificationImportant />
                </ListItemIcon>
              }
            </ListItem>
          <Divider />
        </React.Fragment>
        )
      }
    </React.Fragment>
  );
  
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