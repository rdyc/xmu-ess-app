import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
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

import { ProjectAssignment } from './shared/ProjectAssignment';
import { ProjectAssignmentItem } from './shared/ProjectAssignmentItem';

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
          {props.intl.formatMessage(layoutMessage.text.loading)}
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
          
          <Grid item xs={12} md={8}>
            <Grid container spacing={16}>
              {
                response.data.items &&
                response.data.items.map((item, index) => 
                  <Grid key={index} item xs={12} md={4}>
                    <ProjectAssignmentItem 
                      data={item} 
                      title={`Assignment #${index + 1}`} 
                      subHeader={item.status && item.status.value || 'N/A'} 
                    />
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};