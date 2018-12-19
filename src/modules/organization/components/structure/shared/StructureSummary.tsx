import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { IStructure } from '@organization/classes/response/structure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IStructure;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const structureSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(organizationMessage.structure.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline={true}
        margin="dense"
        label={props.intl.formatMessage(organizationMessage.structure.field.companyUid)}
        value={props.data.company && props.data.company.name || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(organizationMessage.structure.field.positionUid)}
        value={props.data.position && props.data.position.name || 'N/A'}
        multiline
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(organizationMessage.structure.field.description)}
        value={props.data.description || '-'}
        multiline
      />
      <FormControlLabel
        control={<Checkbox checked={!props.data.isExpired} /> }
        label={!props.data.isExpired ?
          props.intl.formatMessage(organizationMessage.structure.field.isExpired) :
          props.intl.formatMessage(organizationMessage.structure.field.isNotExpired)}
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

export const StructureSummary = compose<AllProps, OwnProps>(
  injectIntl
)(structureSummary);