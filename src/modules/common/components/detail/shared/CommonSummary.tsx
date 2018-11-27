import { ISystem } from '@common/classes/response';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
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
  data: ISystem;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const commonSummary: React.SFC<AllProps> = props => (
    <Grid container>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(commonMessage.system.field.name)}
          value={props.data.name}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(commonMessage.system.field.description)}
          value={props.data.description || 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(commonMessage.system.field.type)}
          value={props.data.type}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(commonMessage.system.field.isActive)}
          value={props.data.isActive}
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

export const CommonSummary = compose<AllProps, OwnProps>(
  injectIntl
)(commonSummary);