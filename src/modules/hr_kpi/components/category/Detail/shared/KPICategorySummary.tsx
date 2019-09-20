import { IKPICategory } from '@kpi/classes/response/category';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPICategory;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const kpiCategorySummary: React.SFC<AllProps> = props => (
  <Grid container>
    {/* <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.category.field.uid)}
        value={props.data.uid}
        multiline
      />
    </Grid> */}

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.category.field.name)}
        value={props.data.name}
        multiline
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.category.field.measurementCount)}
        value={props.data.measurementCount}
        multiline
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.category.field.group)}
        value={props.data.groupName}
        multiline
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
      </Grid>
    }
      
    {
      props.data.changes && (props.data.changes.updated && props.data.changes.updatedAt) &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
          value={props.data.changes.updated.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
        />
      </Grid>
    }
  </Grid>
);

export const KPICategorySumarry = compose<AllProps, OwnProps>(
  injectIntl
)(kpiCategorySummary);