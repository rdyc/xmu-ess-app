import { IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  // IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  WithStyles,
} from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProjectDetail, IProjectDocument, IProjectSales, IProjectSite } from '@project/interfaces/response';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, FormattedNumber, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { WorkflowStep } from '@organization/components';

interface PropsFromState extends RouteComponentProps<void> {
  projectState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

export const ProjectDetail: React.StatelessComponent<AllProps> = props => { 
  const { intl } = props;
  const { response } = props.projectState;

  const renderDetail = (project: IProjectDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.infoTitle"/>}
        subheader={<FormattedMessage id="project.infoSubTitle" />}
        // action={
        //   <IconButton>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.uid" />}
          value={project.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.status" />}
          value={project.status ? project.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.owner" />}
          value={project.owner ? project.owner.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.customer" />}
          value={project.customer ? project.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.type" />}
          value={project.project ? project.project.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.name" />}
          value={project.name}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.description" />}
          value={project.description || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.contract" />}
          value={project.contractNumber || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.start" />}
          value={intl.formatDate(project.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.end" />}
          value={intl.formatDate(project.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.currency" />}
          value={project.currency ? project.currency.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.rate" />}
          value={intl.formatNumber(project.rate || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.valueUsd" />}
          value={intl.formatNumber(project.valueUsd)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.valueIdr" />}
          value={intl.formatNumber(project.valueIdr || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.hours" />}
          value={intl.formatNumber(project.maxHours)}
        />
      </CardContent>
    </Card>
  );

  const renderDocuments = (title: string, subHeader: string, documents: IProjectDocument[]) => (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        {
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

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={4} xl={3}>
        {
          response &&
          response.data &&
          renderDetail(response.data)
        }
      </Grid>
      <Grid item xs={12} sm={12} md={4} xl={3}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {
              response &&
              response.data &&
              renderDocuments(intl.formatMessage({id: 'project.documentTitle'}), intl.formatMessage({id: 'project.documentSubTitle'}), response.data.documents)
            }
          </Grid>
          <Grid item xs={12}>
            {
              response &&
              response.data &&
              renderDocuments(intl.formatMessage({id: 'project.documentPreSalesTitle'}),  intl.formatMessage({id: 'project.documentPreSalesSubTitle'}), response.data.documentPreSales)
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={4} xl={3}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              {
                response &&
                response.data &&
                response.data.sales &&
                renderSales(response.data.sales)
              }
            </Grid>
            <Grid item xs={12}>
              {
                response &&
                response.data &&
                response.data.sites &&
                renderSites(response.data.sites)
              }
            </Grid>
          </Grid>
        </Grid>
      <Grid item xs={12} sm={12} md={8} xl={3}>
        {
          response &&
          response.data &&
          response.data.workflow &&
          response.data.workflow.steps &&
          <WorkflowStep steps={response.data.workflow.steps} />
        }
      </Grid>
    </Grid>
  );
};