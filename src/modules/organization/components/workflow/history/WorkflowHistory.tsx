import { WorkflowStatusType } from '@common/classes/types';
import { Card, CardHeader, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import { IOrganizationWorkflow, IOrganizationWorkflowStep } from '@organization/interfaces';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface OwnProps {
  data?: IOrganizationWorkflow;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const workflowHistoryView: React.SFC<AllProps> = props => {
  const { data } = props;

  const renderItem = (item: IOrganizationWorkflowStep) => {
    // const secondaryText = `#${item.level} ${item.position ? item.position.name : 'N/A'}`;
    const secondaryText = item.response && item.response.changes && 
      moment(item.response.changes.updatedAt ? item.response.changes.updatedAt : item.response.changes.createdAt).fromNow();
  
    if (item.isComplete && item.response && item.response.statusType !== WorkflowStatusType.Notify) {
      if (item.response.statusType !== WorkflowStatusType.Opened) {
        if (item.response.changes && item.response.changes.created) {
          return (
            <React.Fragment>
              <Typography variant="body2">{item.response.changes.created.fullName}</Typography>
              {
                item.isComplete &&
                <Typography variant="caption">{secondaryText}</Typography>
              }
            </React.Fragment>
          );
        }
      } else {
        if (item.response.changes && item.response.changes.updated) {
          return (
            <React.Fragment>
              <Typography variant="body2">{item.response.changes.updated.fullName}</Typography>
              {
                item.isComplete &&
                <Typography variant="caption">{secondaryText}</Typography>
              }
            </React.Fragment>
          );
        }
      }
    } else {
      if (item.employees) {
        const emps: string[] = [ ];
  
        item.employees.map(emp => 
          emps.push(emp.fullName)
        );
  
        return (
          <React.Fragment>
            <Typography variant="body2">{emps.join(', ')}</Typography>
            {
              item.isComplete &&
              <Typography variant="caption">{secondaryText}</Typography>
            }
          </React.Fragment>
        );
      }
    }
  
    return null;
  };

  return (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(organizationMessage.workflow.section.historyTitle)}
        // subheader={props.intl.formatMessage(organizationMessage.workflow.section.historySubHeader)}
      />
      <Stepper orientation="vertical">
        {
          data &&
          data.steps &&
          data.steps.map((item, index) =>
            <Step key={index} active completed={item.isComplete}>
              <StepLabel 
                StepIconComponent={() => 
                  <React.Fragment>
                    {item.isComplete ? <CheckCircle color="primary"/> : item.employees && item.employees.length > 1 ? <PeopleIcon color="action"/> : <PersonIcon color="action"/>}
                  </React.Fragment>
                }
                optional={
                  <Typography noWrap variant="caption">
                    #{item.level} {item.position && item.position.name}
                  </Typography>
                }
              >
                {item.isComplete ? item.response && item.response.status && item.response.status.value : item.relation && item.relation.value}
              </StepLabel>
              <StepContent>
                {renderItem(item)}
              </StepContent>
            </Step>
          )
        }
      </Stepper>
    </Card>
  );
};

export const WorkflowHistory = injectIntl(workflowHistoryView);