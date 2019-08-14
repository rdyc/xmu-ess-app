import { IHrCompetencyCategory } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyCategory;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const hrCompetencySummaryCategory: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.name)}
        value={props.data.name}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      {
        props.data.levels.length === 0 ?
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.totalItem, {state: 'Level'})}
          value={props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'level'})}
        />
        :
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.totalItem, {state: 'Level'})}
          value={props.data.levels.length < 2 ?
            props.intl.formatMessage(hrMessage.competency.field.oneItem, {total: props.data.levels.length, state: 'Level'})  : 
            props.intl.formatMessage(hrMessage.competency.field.manyItem, {total: props.data.levels.length, state: 'Levels'}) }
        />
      }
    </Grid>

    <Grid item xs={12} sm={8} md={3}>
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.description)}
        value={props.data.description}
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

export const HrCompetencySummaryCategory = compose<AllProps, OwnProps>(
  injectIntl
)(hrCompetencySummaryCategory);