import { IHrCompetencyEmployee } from '@hr/classes/response';
import { IHrCompetencyStatus } from '@hr/classes/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyEmployee;
}

type AllProps
  = OwnProps
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const hrCompetencySummaryEmployee: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.employee)}
        value={props.data.responden && props.data.responden.fullName}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.year)}
        value={props.data.assessmentYear}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.assessorType)}
        value={props.data.assessor && props.data.assessor.value || 'N/A'}
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
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(hrMessage.competency.field.status)}
        value={IHrCompetencyStatus[props.data.statusType]}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        inputProps={{
          className: props.data.isExpired ? props.classes.colorRed : ''
        }}
        label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Expire Date'})}
        value={props.data.dueDate && moment(props.data.dueDate).utc().format('MMMM D, YYYY') || 'N/A'}
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

export const HrCompetencySummaryEmployee = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles)
)(hrCompetencySummaryEmployee);