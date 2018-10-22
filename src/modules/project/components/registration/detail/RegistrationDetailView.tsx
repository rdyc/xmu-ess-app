import { ProjectType } from '@common/classes/types';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { WorkflowStep } from '@organization/components';
import { IProjectDocument, IProjectSales, IProjectSite } from '@project/classes/response';
import { RegistrationDetailProps } from '@project/components/registration/detail/RegistrationDetail';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { ProjectInformation } from './shared/ProjectInformation';

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

  const renderDocuments = (title: string, subHeader: string, documents: IProjectDocument[] | undefined) => (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        {
          documents &&
          documents.map(item => 
            item.document &&
            <div key={item.uid}>
              <FormControlLabel 
                contentEditable={false}
                key={item.uid}
                label={item.document.value}
                control={<Checkbox checked={item.isAvailable}/>} 
              />
            </div>
          )
        }
      </CardContent>
    </Card>
  );

  const renderSales = (sales: IProjectSales[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.salesTitle" />}
        subheader={<FormattedMessage id="project.salesSubTitle" />}
      />
      <CardContent>
        <List>
        {
          sales.map(item => 
            item.employee &&
            <ListItem 
              disableGutters 
              key={item.employeeUid}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.employee.fullName} 
                >
                  <PersonIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.employee.fullName} 
                secondary={item.employee.email}
              />
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
  );

  const renderSites = (sites: IProjectSite[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.siteTitle" />}
        subheader={<FormattedMessage id="project.siteSubTitle" />}
      />
      <CardContent>
        <List>
        {
          sites.map(item => 
            <ListItem disableGutters key={item.uid}>
              <Grid container>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.name} 
                    secondary={item.type ? item.type.value : 'N/A'}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    noWrap 
                    variant="display1" 
                    align="right"
                  >
                    <FormattedNumber 
                      value={item.value} 
                    />
                  </Typography>
                </Grid>
              </Grid>
              
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
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
        response && 
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              <ProjectInformation 
                data={response.data}
                intl={intl}
              />
            }
          </Grid>
          
          {
            response &&
            response.data &&
            response.data.projectType === ProjectType.Project &&
            <Grid item xs={12} md={4}>
              {renderDocuments(intl.formatMessage({id: 'project.document.projectTitle'}), intl.formatMessage({id: 'project.document.projectSubTitle'}), response.data.documents)}
            </Grid>
          }
          {
            response &&
            response.data &&
            response.data.projectType === ProjectType.PreSales &&
            <Grid item xs={12} md={4}>
            {renderDocuments(intl.formatMessage({id: 'project.document.preSalesTitle'}),  intl.formatMessage({id: 'project.document.preSalesSubTitle'}), response.data.documentPreSales)}
            </Grid>
          }

          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.sales &&
              renderSales(response.data.sales)
            }
          </Grid>

          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.sites &&
              renderSites(response.data.sites)
            }
          </Grid>

          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.workflow &&
              response.data.workflow.steps &&
              <WorkflowStep steps={response.data.workflow.steps} />
            }
          </Grid>

        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};