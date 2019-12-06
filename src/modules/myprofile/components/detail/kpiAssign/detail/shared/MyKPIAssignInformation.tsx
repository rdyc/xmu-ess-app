import { IKPIAssign } from '@account/classes/response/employeeKPIAssign';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPIAssign;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const myKPIAssignInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(kpiMessage.employee.section.infoTitle)}
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

export const MyKPIAssignInformation = compose<AllProps, OwnProps>(injectIntl)(myKPIAssignInformation);