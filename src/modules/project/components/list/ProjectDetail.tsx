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
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  WithStyles,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import { IOrganizationWorkflowStep } from '@organization/interfaces';
import { IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProjectDetail, IProjectDocument, IProjectSales, IProjectSite } from '@project/interfaces/response';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  projectState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const ProjectDetail: React.StatelessComponent<AllProps> = props => {
  const { response } = props.projectState;

  const renderDetail = (project: IProjectDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.information"/>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.uid" />}
          value={project.uid}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.name" />}
          value={project.name}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.description" />}
          value={project.description || 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.status" />}
          value={project.status ? project.status.value : 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.owner" />}
          value={project.owner ? project.owner.fullName : 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.customer" />}
          value={project.customer ? project.customer.name : 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.type" />}
          value={project.project ? project.project.value : 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.contract" />}
          value={project.contractNumber || 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.start" />}
          value={project.start}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.end" />}
          value={project.end}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.currency" />}
          value={project.currency ? project.currency.value : 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.rate" />}
          value={project.rate || 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.value" />}
          value={project.valueUsd}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.valueIdr" />}
          value={project.valueIdr || 'N/A'}
        />
        <TextField
          disabled
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.hours" />}
          value={project.maxHours}
        />
      </CardContent>
    </Card>
  );

  const renderDocuments = (title: JSX.Element, documents: IProjectDocument[]) => (
    <Card square>
      <CardHeader 
        title={title}
        subheader=""
      />
      <CardContent>
        {
          documents.map(item => 
            item.document &&
            <div>
              <FormControlLabel 
                disabled
                key={item.uid}
                label={item.document.value}
                control={<Checkbox checked={item.isAvailable} />} 
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
        title={<FormattedMessage id="project.sales" />}
        subheader=""
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
        title={<FormattedMessage id="project.sites" />}
        subheader=""
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

  const renderHistoryUser = (item: IOrganizationWorkflowStep) => {
    const secondaryText = `#${item.level} ${item.position ? item.position.name : 'N/A'}`;

    if (item.isComplete) {
      if (item.response && item.response.changes && item.response.changes.created) {
        return (
          <ListItemText
            key={item.level}
            primary={item.response.changes.created.fullName} 
            secondary={secondaryText}
          />
        );
      }
    } else {
      if (item.employees) {
        const emps: string[] = [ ];

        item.employees.map(emp => 
          emps.push(emp.fullName)
        );

        return (
          <ListItemText
            key={item.level}
            primary={emps.join(', ')} 
            secondary={secondaryText}
          />
        );
      }
    }

    return null;
  };

  const renderHistory = (steps: IOrganizationWorkflowStep[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.history" />}
        subheader=""
      />
      <CardContent>
        <List>
        {
          steps.map(item => 
            <ListItem key={`${item.round}${item.level}`} disableGutters>              
              <ListItemAvatar>
                <Avatar>
                  {item.isComplete ? <PersonIcon/> : <PeopleIcon/>}
                </Avatar>
              </ListItemAvatar>
              {renderHistoryUser(item)}
              <ListItemSecondaryAction>
                <Typography 
                  noWrap 
                  variant="body2" 
                  align="right"
                >
                  {
                    item.response &&  
                    item.response.status &&
                    item.response.status.value
                  }
                </Typography>
                <Typography 
                  noWrap 
                  variant="caption" 
                  align="right"
                >
                  {
                    item.response &&  
                    item.response.changes &&
                    moment(item.response.changes.updatedAt ? item.response.changes.updatedAt : item.response.changes.createdAt).fromNow()
                  }
                </Typography>
              </ListItemSecondaryAction>
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
              renderDocuments(<FormattedMessage id="project.documents"/>, response.data.documents)
            }
          </Grid>
          <Grid item xs={12}>
            {
              response &&
              response.data &&
              renderDocuments(<FormattedMessage id="project.documents-presales"/>, response.data.documentPreSales)
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
          renderHistory(response.data.workflow.steps)
        }
      </Grid>
    </Grid>
  );
};