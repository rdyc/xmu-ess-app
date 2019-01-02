import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Grid, TextField } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { ITravelSettlement } from '@travel/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

interface OwnProps {
  data: ITravelSettlement;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelSummary: React.SFC<AllProps> = props => (
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
        label={<FormattedMessage id="travel.field.information.uid" />}
        value={props.data.uid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="travel.field.information.requestor" />}
        value={props.data.employee ? props.data.employee.fullName : 'N/A'}
      />
      <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.positionUid" />}
          value={props.data.position ? props.data.position.name : 'N/A'}
        />      
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="travel.field.information.customerUid" />}
        value={props.data.customer ? props.data.customer.name : 'N/A'}
      />
      <TextField
        {...styled}
        multiline
        margin="dense"
        label={<FormattedMessage id="travel.field.information.projectUid" />}
        value={`${props.data.projectUid} - ${ props.data.project && props.data.project.name }`}
      />
      <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.siteUid" />}
          value={props.data.site ? props.data.site.name : 'N/A'}
        />
      <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.activityType" />}
          value={props.data.activity ? props.data.activity.value : 'N/A'}
        />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="travel.field.information.start" />}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="travel.field.information.end" />}
        value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
      />
      <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.objective" />}
          value={props.data.objective || 'N/A'}
      />
      <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.target" />}
          value={props.data.target || 'N/A'}
      />
    </Grid>
    
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.comment" />}
          value={props.data.comment || 'N/A'}
        />
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

export const TravelSummarySettlement = compose<AllProps, OwnProps>(
  injectIntl
)(travelSummary);