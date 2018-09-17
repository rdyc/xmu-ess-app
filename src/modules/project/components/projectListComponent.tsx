import { IResponseCollection, IBaseChanges } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { Divider, List, ListItem, WithStyles, Grid, Typography } from '@material-ui/core';
import { IProject } from '@project/interfaces/response';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as moment from 'moment';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  response: IResponseCollection<IProject>;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const ProjectListComponent: React.StatelessComponent<AllProps> = props => {
  const parseChanges = (changes: IBaseChanges | null) => {
    if (changes === null) {
      return 'Unknown';
    } else {
      if (changes.updatedBy !== null) {
        return changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
      } else {
        return changes.created ? changes.created.fullName : changes.createdBy;
      }
    }
  };

  return (
    <List>
      {props.response.data.map(project => 
        <div key={project.uid}>
          <ListItem key={project.uid} button>
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography variant="body2">
                  {project.name} 
                </Typography>
                <Typography variant="body1">
                  {project.customer && project.customer.name} {project.contractNumber && `(PO: ${project.contractNumber})`}
                </Typography>
                <Typography variant="caption">
                  {project.uid} | {project.project && project.project.value}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography variant="body2" align="right">
                  {project.status && project.status.value}
                </Typography>
                <Typography variant="body1" align="right">
                  {parseChanges(project.changes)}
                </Typography>
                <Typography variant="caption" align="right">
                  {project.changes && moment(project.changes.updatedAt ? project.changes.updatedAt : project.changes.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider/>
        </div>
      )}
    </List>
  );
};