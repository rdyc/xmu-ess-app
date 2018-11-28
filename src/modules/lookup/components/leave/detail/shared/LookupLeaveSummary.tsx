import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { ILookupLeave } from '@lookup/classes/response';
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
  data: ILookupLeave;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupLeaveSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.uid)}
        value={props.data.company ? props.data.company.name : 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...styled}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.contactNumber)}
        value={props.data.name || 'N/A'}
      />
      <TextField
        {...styled}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(leaveMessage.request.field.contactNumber)}
        value={props.data.category && props.data.category.description || 'N/A'}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
    <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(leaveMessage.request.field.contactNumber)}
        value={props.intl.formatNumber(props.data.year)}
      />
    <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(leaveMessage.request.field.contactNumber)}
        value={props.intl.formatNumber(props.data.allocation)}
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

export const LookupLeaveSummary = compose<AllProps, OwnProps>(
  injectIntl
)(lookupLeaveSummary);