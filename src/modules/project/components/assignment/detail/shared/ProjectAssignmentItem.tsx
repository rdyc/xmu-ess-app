import { WorkflowStatusType } from '@common/classes/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IProjectAssignmentDetailItem;
  title: string;
  subHeader: string;
  onClickItem?: () => void | undefined;
}

type AllProps 
  = OwnProps
  & InjectedIntlProps;

const projectAssignmentItem: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.title}
      subheader={props.subHeader}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.itemUid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.employeeUid)}
        value={props.data.employee && props.data.employee.fullName || props.data.employeeUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.role)}
        value={props.data.role || '-'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline={true}
        label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
        value={props.data.jobDescription || '-'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
        value={props.intl.formatNumber(props.data.mandays)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.hours)}
        value={props.intl.formatNumber(props.data.hours)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.statusType)}
        value={props.data.status && props.data.status.value || 'N/A'}
      />
      {
        props.data.statusType === WorkflowStatusType.Rejected &&
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.reason)}
        value={props.data.rejectedReason || '-'}
        />
      }
      
      {props.children}
    </CardContent>

    {
      props.data.statusType === WorkflowStatusType.Submitted &&
      props.onClickItem &&
      <CardActions>
        <Button 
          color="secondary"
          size="small"
          onClick={() => props.onClickItem && props.onClickItem()}
        >
          {props.intl.formatMessage(projectMessage.assignment.action.acceptance)}
        </Button>
      </CardActions>
    }
  </Card> 
);

export const ProjectAssignmentItem = compose<AllProps, OwnProps>(
  injectIntl
)(projectAssignmentItem);