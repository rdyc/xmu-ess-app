import { WorkflowStatusType } from '@common/classes/types';
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

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

const projectAssignmentItem: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.title}
      subheader={props.subHeader}
    />
    <CardContent>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.itemUid)}
        value={props.data.uid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.employeeUid)}
        value={props.data.employee && props.data.employee.fullName || props.data.employeeUid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.role)}
        value={props.data.role || '-'}
      />
      <TextField
        multiline={true}
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
        value={props.data.jobDescription || '-'}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
        value={props.intl.formatNumber(props.data.mandays)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.hours)}
        value={props.intl.formatNumber(props.data.hours)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.assignment.field.status)}
        value={props.data.status && props.data.status.value || 'N/A'}
      />
      {
        props.data.statusType === WorkflowStatusType.Rejected &&
        <TextField
        {...styled}
        margin="dense"
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