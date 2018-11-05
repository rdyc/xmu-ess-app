import { Card, CardContent, CardHeader, Grid, TextField } from '@material-ui/core';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IProjectAssignmentDetailItem[] | null | undefined;
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

const projectAssignmentMember: React.SFC<AllProps> = props => (
  <Grid container spacing={16}>
    {
      props.data &&
      props.data.map((item, index) => 
        <Grid key={index} item xs={12} md={4}>
          <Card>
            <CardHeader 
              title={`#${index + 1} - ${item.uid}`}
              subheader={`${item.status && item.status.value} ${item.rejectedReason || ''}`}
              titleTypographyProps={{variant: 'body2'}}
            />
            <CardContent>
              <TextField
                {...styled}
                margin="dense"
                label={props.intl.formatMessage(projectMessage.assignment.field.employeeUid)}
                value={item.employee && item.employee.fullName || item.employeeUid}
              />
              <TextField
                {...styled}
                margin="dense"
                label={props.intl.formatMessage(projectMessage.assignment.field.role)}
                value={item.role || '-'}
              />
              <TextField
                multiline={true}
                {...styled}
                margin="dense"
                label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
                value={item.jobDescription || '-'}
              />
              <TextField
                {...styled}
                margin="dense"
                label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
                value={props.intl.formatNumber(item.mandays)}
              />
              <TextField
                {...styled}
                margin="dense"
                label={props.intl.formatMessage(projectMessage.assignment.field.hours)}
                value={props.intl.formatNumber(item.hours)}
              />
            </CardContent>
          </Card>  
        </Grid>
      )
    }
  </Grid>
);

export const ProjectAssignmentMember = compose<AllProps, OwnProps>(
  injectIntl
)(projectAssignmentMember);