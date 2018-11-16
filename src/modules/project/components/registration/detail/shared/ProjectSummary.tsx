import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Grid, TextField } from '@material-ui/core';
import { IProject } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

interface OwnProps {
  data: IProject;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const projectSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.statusType)}
        value={props.data.status ? props.data.status.value : props.data.statusType}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.employeeUid)}
        value={props.data.owner ? props.data.owner.fullName : 'N/A'}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.customerUid)}
        value={props.data.customer ? props.data.customer.name : 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.projectType)}
        value={props.data.project ? props.data.project.value : 'N/A'}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.name)}
        value={props.data.name}
      />
      <TextField
        {...styled}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.description)}
        value={props.data.description || 'N/A'}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.contractNumber)}
        value={props.data.contractNumber || 'N/A'}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.start)}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.end)}
        value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(projectMessage.registration.field.hours)}
        value={props.intl.formatNumber(props.data.maxHours)}
      />
    </Grid>
    
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...styled}
            margin="dense"
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const ProjectSumarry = compose<AllProps, OwnProps>(
  injectIntl
)(projectSummary);