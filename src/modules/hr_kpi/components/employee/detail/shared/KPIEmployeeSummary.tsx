import { IKPIEmployee } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPIEmployee;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const kpiEmployeeSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      {/* <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.uid)}
        value={props.data.uid}
      /> */}
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.employeeUid)}
        value={props.data.kpiAssign && props.data.kpiAssign.employee && props.data.kpiAssign.employee.fullName || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.year)}
        value={props.data.kpiAssign && props.data.kpiAssign.year.toString() || ''}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.period)}
        value={props.intl.formatNumber(props.data.period)}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.templateUid)}
        value={props.data.kpiAssign && props.data.kpiAssign.template && props.data.kpiAssign.template.name || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.totalScore)}
        value={`${props.intl.formatNumber(props.data.totalScore)} %`}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.status)}
        value={props.data.status && props.data.status.value}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(kpiMessage.employee.field.isFinal)}
        value={props.data.isFinal && 
          props.intl.formatMessage(kpiMessage.employee.field.isFinalTrue) ||
          props.intl.formatMessage(kpiMessage.employee.field.isFinalFalse)}
      />
      {
        props.data.revision && 
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        label={props.intl.formatMessage(kpiMessage.employee.field.revision)}
        value={props.data.revision}
      />
      }
    </Grid>

    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        {/* {
          (props.data.sent && props.data.sentAt) &&
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.createdBy)}
              value={props.data.sent && props.data.sent.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.sentAt, GlobalFormat.DateTime) || 'N/A'}
            />
        } */}

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

export const KPIEmployeeSummary = compose<AllProps, OwnProps>(
  injectIntl
)(kpiEmployeeSummary);