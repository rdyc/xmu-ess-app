import { FormMode } from '@generic/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { ProjectAssignmentDetailProps } from '@project/components/assignment/detail/ProjectAssignmentDetail';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProjectAssignment } from './shared/ProjectAssignment';
import { ProjectAssignmentMember } from './shared/ProjectAssignmentMember';

export const ProjectAssignmentDetailView: React.SFC<ProjectAssignmentDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed
  } = props;
  
  const { isLoading, response } = props.projectAssignmentState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="project-detail-dialog-title"
      aria-describedby="project-detail-dialog-description"
    >
      <DialogTitle id="project-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="project-detail-dialog-description">
          {dialogDescription || 'description'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {dialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {dialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        !isLoading &&
        response && 
        response.data &&
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <ProjectAssignment formMode={FormMode.View} data={response.data} />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <ProjectAssignmentMember data={response.data.items} />
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};