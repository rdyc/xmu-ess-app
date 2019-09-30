import { IHrCornerPage } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCornerPage;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const hrCornerPageSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.corner.field.category)}
        value={props.data.category.name}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.corner.field.title)}
        value={props.data.title}
      />
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.corner.field.headline)}
        value={props.data.headline}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.corner.field.start)}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.corner.field.end)}
        value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
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

export const HrCornerPageSummary = compose<AllProps, OwnProps>(
  injectIntl
)(hrCornerPageSummary);