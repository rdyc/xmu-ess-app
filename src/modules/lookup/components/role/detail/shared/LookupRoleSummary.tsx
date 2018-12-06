import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IRole } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IRole;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupRoleSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.role.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.role.field.companyUid)}
        value={props.data.company ? props.data.company.name : 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.role.field.gradeType)}
        value={props.data.grade ? props.data.grade.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.role.field.name)}
        value={props.data.name}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.role.field.description)}
        value={props.data.description || 'N/A'}
      />
      <FormControlLabel
        control={
          <Checkbox checked={props.data.isActive} />
        }
        label={props.intl.formatMessage(lookupMessage.role.field.isActive)}
      />
    </Grid>

    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const LookupRoleSumarry = compose<AllProps, OwnProps>(
  injectIntl
)(lookupRoleSummary);