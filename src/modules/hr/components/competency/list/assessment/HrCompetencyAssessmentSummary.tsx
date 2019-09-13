import { IHrCompetencyAssessment } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyAssessment;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const hrCompetencySummaryAssessment: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'})}
        value={props.data.employee.fullName}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Year'})}
        value={props.data.assessmentYear}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Company'})}
        value={props.data.position.company && props.data.position.company.name || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'})}
        value={props.data.position.name}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      {
        props.data.responders && props.data.responders.length === 0 ?
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.totalItem, {state: 'Responder'})}
          value={props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'responder'})}
        />
        :
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.totalItem, {state: 'Responder'})}
          value={props.data.responders && props.data.responders.length < 2 ?
            props.intl.formatMessage(hrMessage.competency.field.oneItem, {total: props.data.responders && props.data.responders.length, state: 'Responder'})  : 
            props.intl.formatMessage(hrMessage.competency.field.manyItem, {total: props.data.responders && props.data.responders.length, state: 'Responders'}) }
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

export const HrCompetencySummaryAssessment = compose<AllProps, OwnProps>(
  injectIntl
)(hrCompetencySummaryAssessment);