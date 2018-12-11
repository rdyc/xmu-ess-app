import { isWithCompany, isWithParent } from '@common/helper';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHierarchy;
  category?: string;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const organizationHierarchySummary: React.SFC<AllProps> = props => (
    <Grid container>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.name)}
          value={props.data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.description)}
          value={props.data.description || 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        {
          isWithCompany(props.category) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(organizationMessage.hierarchy.field.companyUid)}
            value={props.data.company && props.data.company.name || 'N/A'}
          />
        }
        {
          
          isWithParent(props.category) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(organizationMessage.hierarchy.field.inactiveDate)}
            value={props.data.inactiveDate && props.intl.formatDate(props.data.inactiveDate, GlobalFormat.Date) || 'N/A'}
          />
        }
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

export const OrganizationHierarchySummary = compose<AllProps, OwnProps>(
  injectIntl
)(organizationHierarchySummary);