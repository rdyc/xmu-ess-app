import { IAssessmentItem, IHrCompetencyAssessment } from '@hr/classes/response';
import { IHrCompetencyStatus } from '@hr/classes/types';
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

const hrCompetencySummaryAssessment: React.SFC<AllProps> = props => {

  const countResponder = (item?: IAssessmentItem[]): number => {
    if (item && item.length > 0) {
      const array = item;

      array.filter(arr => arr.isExpired && !arr.isComplete);

      return array.length;
    }

    return 0;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.employee)}
          value={props.data.employee.fullName}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.year)}
          value={props.data.assessmentYear}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.company)}
          value={props.data.company && props.data.company.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.position)}
          value={props.data.position && props.data.position.name || 'N/A'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        {/* {
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
        } */}
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.status)}
          value={IHrCompetencyStatus[props.data.statusType]}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(hrMessage.competency.field.completion)}
          value={props.intl.formatMessage(hrMessage.competency.field.completionItem, {responder: countResponder(props.data.responders) || 0, completion: props.data.totalResponse || 0})}
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
};

export const HrCompetencySummaryAssessment = compose<AllProps, OwnProps>(
  injectIntl
)(hrCompetencySummaryAssessment);