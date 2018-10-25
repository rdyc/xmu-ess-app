import { ProjectType } from '@common/classes/types';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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
import { WorkflowApprovalForm } from '@organization/components/workflow/forms/WorkflowApprovalForm';
import { IProjectDocument, IProjectSales, IProjectSite } from '@project/classes/response';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { ProjectApprovalDetailProps } from './ProjectApprovalDetail';

export const ProjectApprovalDetailView: React.SFC<ProjectApprovalDetailProps> = props => {
  const { approvalTitle, approvalSubHeader, approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText } = props;
  const { intl, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectApprovalState.detail;

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
              <ProjectInformation data={response.data}/>
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

           <Grid item xs={12} md={4}>
              <WorkflowApprovalForm
                approvalTitle={approvalTitle}
                approvalSubHeader={approvalSubHeader}
                approvalDialogTitle={approvalDialogTitle}
                approvalDialogContentText={approvalDialogContentText}
                approvalDialogCancelText={approvalDialogCancelText}
                approvalDialogConfirmedText={approvalDialogConfirmedText}
                validate={handleValidate}
                onSubmit={handleSubmit} 
                onSubmitSuccess={handleSubmitSuccess}
                onSubmitFail={handleSubmitFail}
              />
           </Grid>

        </Grid>
      }
    </React.Fragment>
  );

  return render;
};