import { IKPITemplate } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPITemplate;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const kpiTemplateSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      {/* <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.template.field.uid)}
        value={props.data.uid}
      /> */}
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.template.field.companyUid)}
        value={props.data.company && props.data.company.name || 'N/A'}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.template.field.positionUid)}
        value={props.data.position && props.data.position.name || 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.template.field.name)}
        value={props.data.name || 'N/A'}
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

export const KPITemplateSummary = compose<AllProps, OwnProps>(
  injectIntl
)(kpiTemplateSummary);