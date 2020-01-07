import { IKPIAssignDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPIAssignDetail;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const kpiAssignInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(kpiMessage.employee.section.infoTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.mileageException.field.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(kpiMessage.employee.field.employeeUid)}
          value={props.data.employee && props.data.employee.fullName || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(kpiMessage.employee.field.year)}
          value={props.data.year.toString()}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(kpiMessage.employee.field.templateUid)}
          value={props.data.template && props.data.template.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(kpiMessage.employee.field.note)}
          value={props.data.note || 'N/A'}
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

export const KPIAssignInformation = compose<AllProps, OwnProps>(injectIntl)(kpiAssignInformation);