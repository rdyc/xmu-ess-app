import { ProjectType } from '@common/classes/types';
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
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { RegistrationDetailProps } from '@project/components/registration/detail/RegistrationDetail';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProjectDocument } from './shared/ProjectDocument';
import { ProjectInformation } from './shared/ProjectInformation';
import { ProjectSales } from './shared/ProjectSales';
import { ProjectSite } from './shared/ProjectSite';

export const RegistrationDetailView: React.SFC<RegistrationDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  
  const { isLoading, response } = props.projectRegisterState.detail;

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
            <ProjectInformation data={response.data}/>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              {
                response.data.projectType === ProjectType.Project &&
                <Grid item>
                  <ProjectDocument 
                    title={intl.formatMessage({id: 'project.document.projectTitle'})}
                    subHeader={intl.formatMessage({id: 'project.document.projectSubTitle'})}
                    data={response.data.documents}
                  />
                </Grid>
              }
              
              {
                response.data.projectType === ProjectType.PreSales &&
                <Grid item>
                  <ProjectDocument 
                    title={intl.formatMessage({id: 'project.document.preSalesTitle'})}
                    subHeader={intl.formatMessage({id: 'project.document.preSalesSubTitle'})}
                    data={response.data.documentPreSales}
                  />
                </Grid>
              }

              <Grid item>
                <ProjectSales data={response.data.sales} />
              </Grid>

              <Grid item>
                <ProjectSite data={response.data.sites} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <WorkflowHistory data={response.data.workflow} />
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};