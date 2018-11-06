import { WorkflowRelationType } from '@common/classes/types';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import { IOrganizationWorkflow, IOrganizationWorkflowStep } from '@organization/interfaces';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface OwnProps {
  data: IOrganizationWorkflow | null | undefined;
}

export const WorkflowHistory: React.SFC<OwnProps> = props => {
  const { data } = props;

  const renderItem = (item: IOrganizationWorkflowStep) => {
    const secondaryText = `#${item.level} ${item.position ? item.position.name : 'N/A'}`;
  
    if (item.isComplete && item.relationType !== WorkflowRelationType.NotifyOnly) {
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

  return (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="workflow.stepsTitle" />}
        subheader={<FormattedMessage id="workflow.stepsSubTitle" />}
      />
      <CardContent>
        <List>
          { 
            !data && 
            <ListItemText
              primary={<FormattedMessage id="workflow.history.empty" />} 
            />
          }
          {
            data &&
            data.steps &&
            data.steps.map((item, index) => 
              <ListItem key={index} disableGutters>              
                <ListItemAvatar>
                  <Avatar>
                    {item.isComplete ? <PersonIcon/> : <PeopleIcon/>}
                  </Avatar>
                </ListItemAvatar>
                {renderItem(item)}
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
};