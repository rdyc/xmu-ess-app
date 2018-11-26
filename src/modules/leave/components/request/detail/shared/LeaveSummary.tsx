import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { ILeave } from '@leave/classes/response';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Grid, TextField } from '@material-ui/core';
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
  data: ILeave;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const leaveSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.statusType)}
        value={props.data.status ? props.data.status.value : props.data.statusType}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.uid)}
        value={props.data.uid}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
      {...styled}
      margin="dense"
      label={props.intl.formatMessage(leaveMessage.request.field.leaveType)}
      value={props.data.leave ? props.data.leave.value : 'N/A'}
    />
    <TextField
      {...styled}
      margin="dense"
      label={props.intl.formatMessage(leaveMessage.request.field.regularType)}
      value={props.data.regular ? props.data.regular.leave ? props.data.regular.leave.name : 'N/A' : 'N/A'}
    />
      <TextField
        {...styled}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.contactNumber)}
        value={props.data.contactNumber || 'N/A'}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.reason)}
        value={props.data.reason || 'N/A'}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.start)}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.end)}
        value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
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

export const LeaveSummary = compose<AllProps, OwnProps>(
  injectIntl
)(leaveSummary);