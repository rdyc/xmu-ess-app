import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IPosition } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPosition;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const positionSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.position.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.position.field.name)}
        value={props.data.name || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(lookupMessage.position.field.inactiveDate)}
        value={props.data.inactiveDate ? props.intl.formatDate(props.data.inactiveDate, GlobalFormat.Date) : props.intl.formatMessage(lookupMessage.position.field.indefinitely)}
        multiline
      />
      <FormControlLabel
        control={ <Checkbox checked={props.data.isExpired} /> }
        label={!props.data.isExpired ?
          props.intl.formatMessage(lookupMessage.position.field.isExpired) :
          props.intl.formatMessage(lookupMessage.position.field.isNotExpired)}
        />
    </Grid>

    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
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

export const PositionSummary = compose<AllProps, OwnProps>(
  injectIntl
)(positionSummary);