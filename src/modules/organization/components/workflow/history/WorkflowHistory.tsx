import { WorkflowStatusType } from '@common/classes/types';
import { GlobalFormat } from '@layout/types';
import {
  Card,
  CardHeader,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { CheckCircle, ExpandMore } from '@material-ui/icons';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import { IOrganizationWorkflow, IOrganizationWorkflowStep } from '@organization/interfaces';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface OwnProps {
  data?: IOrganizationWorkflow;
}

type AllProps
  = OwnProps
  & InjectedIntlProps
  & WithStyles<typeof styles>;

interface IWorkflowRoundStep {
  round: number;
  steps: IOrganizationWorkflowStep[]; 
}

const groupBy = (steps: IOrganizationWorkflowStep[]) => {
  const result: IWorkflowRoundStep[] = [];

  steps.forEach(step => {
    // check current round
    const currentRound = result.findIndex(item => item.round === step.round);
    
    if (currentRound !== -1) {
      result[currentRound].steps.push(step);
    } else {
      result.push({
        round: step.round,
        steps: [step]
      });
    }
  });

  return result;
};

const workflowHistoryView: React.SFC<AllProps> = props => {
  let roundGroup: IWorkflowRoundStep[] = [];

  if (props.data) {
    roundGroup = groupBy(props.data.steps);
  }

  const renderItem = (item: IOrganizationWorkflowStep) => {
    // const secondaryText = `#${item.level} ${item.position ? item.position.name : 'N/A'}`;
    const secondaryDate = item.response && item.response.changes && 
      props.intl.formatDate(item.response.changes.updatedAt ? item.response.changes.updatedAt : item.response.changes.createdAt, GlobalFormat.DateTime);

    const secondaryAgo = item.response && item.response.changes && 
      moment(item.response.changes.updatedAt ? item.response.changes.updatedAt : item.response.changes.createdAt).fromNow();
  
    if (item.isComplete && item.response && item.response.statusType !== WorkflowStatusType.Notify) {
      if (item.response.statusType !== WorkflowStatusType.Opened) {
        if (item.response.changes && item.response.changes.created) {
          return (
            <React.Fragment>
              <Typography variant="body2">{item.response.changes.created.fullName}</Typography>
              {
                item.isComplete &&
                <Typography variant="caption">
                  {`${secondaryDate} - ${secondaryAgo}`}
                </Typography>
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
                <Typography variant="caption">
                  {`${secondaryDate} - ${secondaryAgo}`}
                </Typography>
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
              <Typography variant="caption">
                {`${secondaryDate} - ${secondaryAgo}`}
              </Typography>
            }
          </React.Fragment>
        );
      }
    }
  
    return null;
  };

  return (
    <React.Fragment>
      <Card square>
        <CardHeader title={props.intl.formatMessage(organizationMessage.workflow.section.historyTitle)} />
      </Card>
      
      {
        roundGroup.map((group, gIndex) =>
          <ExpansionPanel key={gIndex} defaultExpanded={gIndex === 0}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography variant="body1">Round {group.round}</Typography>
            </ExpansionPanelSummary>
            
            <Divider/>
            
            <ExpansionPanelDetails className={props.classes.paddingDisabled}>
              <Stepper orientation="vertical">
                {
                  group.steps.map((item, iIndex) => 
                    <Step key={iIndex} active completed={item.isComplete}>
                      <StepLabel 
                        StepIconComponent={() => 
                          <React.Fragment>
                            {item.isComplete ? <CheckCircle color="secondary"/> : item.employees && item.employees.length > 1 ? <PeopleIcon color="action"/> : <PersonIcon color="action"/>}
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }
    </React.Fragment>
  );
};

export const WorkflowHistory = injectIntl(withStyles(styles)(workflowHistoryView));