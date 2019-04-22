import { WorkflowStatusType } from '@common/classes/types';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  items?: IProjectAssignmentDetailItem[];
  onClickItem?: () => void | undefined;
}

type AllProps 
  = IOwnProps
  & InjectedIntlProps;

const projectAssignmentItem: React.SFC<AllProps> = props => (
  <React.Fragment>
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(projectMessage.assignment.section.itemTitle)}
        subheader={`${props.items && props.items.length || 0} Item(s)`}
      />
    </Card>

    {
      props.items &&
      props.items.map((item, index) =>
      <ExpansionPanel key={index} defaultExpanded={index === 0}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <ListItemText
            primary={item.employee && item.employee.fullName}
            secondary={`${props.intl.formatNumber(item.mandays)} Mandays | ${props.intl.formatNumber(item.allocatedHours || 0)} Allocated Hours | ${props.intl.formatNumber(item.consumedHours || 0)} Consumed Hours`}
          />
        </ExpansionPanelSummary>
    
        <Divider/>
    
        <ExpansionPanelDetails>
          <div>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.itemUid)}
              value={item.uid}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.employeeUid)}
              value={item.employee && item.employee.fullName || item.employeeUid}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.role)}
              value={item.role || '-'}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              multiline={true}
              label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
              value={item.jobDescription || '-'}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
              value={props.intl.formatNumber(item.mandays)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.allocatedHours)}
              value={props.intl.formatNumber(item.allocatedHours)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.consumedHours)}
              value={props.intl.formatNumber(item.consumedHours)}
            />
            {/* <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.statusType)}
              value={props.data.status && props.data.status.value || 'N/A'}
            /> */}
            {
              item.statusType === WorkflowStatusType.Rejected &&
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(projectMessage.assignment.field.reason)}
                value={item.rejectedReason || '-'}
              />
            }
            
            {
              item.changes &&
              <React.Fragment>
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  label={props.intl.formatMessage(layoutMessage.field.createdBy)}
                  value={item.changes.created && item.changes.created.fullName || 'N/A'}
                  helperText={props.intl.formatDate(item.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
                />
    
                {
                  (item.changes.updated && item.changes.updatedAt) &&
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
                    value={item.changes.updated.fullName || 'N/A'}
                    helperText={props.intl.formatDate(item.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
                  />
                }
              </React.Fragment>
            }
    
            {props.children}
          </div>
        </ExpansionPanelDetails>
    
        {
          item.statusType === WorkflowStatusType.Submitted &&
          props.onClickItem &&
          <React.Fragment>
            <Divider/>
    
            <ExpansionPanelActions>
              <Button 
                color="primary"
                size="small"
                fullWidth={true}
                onClick={() => props.onClickItem && props.onClickItem()}
              >
                {props.intl.formatMessage(projectMessage.assignment.option.acceptance)}
              </Button>
            </ExpansionPanelActions>
          </React.Fragment>
        }
      </ExpansionPanel> 
      )
    }
  </React.Fragment>
);

export const ProjectAssignmentItem = compose<AllProps, IOwnProps>(
  injectIntl
)(projectAssignmentItem);