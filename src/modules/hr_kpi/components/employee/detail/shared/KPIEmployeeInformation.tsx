import { IKPIEmployeeDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPIEmployeeDetail;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const kpiEmployeeInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(kpiMessage.employee.section.infoTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.mileageException.field.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(kpiMessage.employee.field.uid)}
          value={props.data.uid}
        />
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
          value={props.data.period === 1 && props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || props.intl.formatMessage(kpiMessage.employee.field.periodFullYear)}
        />
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
        {/* {
          props.data.sent &&
          props.data.sentAt &&
          <React.Fragment>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.createdBy)}
              value={props.data.sent && props.data.sent.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.sentAt, GlobalFormat.DateTime) || 'N/A'}
            />
          </React.Fragment>
        } */}
        {
          props.data.changes &&
          <React.Fragment>
            {
              (props.data.changes.updated && props.data.changes.updatedAt) &&
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
                value={props.data.changes.updated.fullName || 'N/A'}
                helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
              />
              ||
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(layoutMessage.field.createdBy)}
                value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
                helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
              />
            }
          </React.Fragment>
      }
      </CardContent>
    </Card>
  );

  return render;
};

export const KPIEmployeeInformation = compose<AllProps, OwnProps>(injectIntl)(kpiEmployeeInformation);