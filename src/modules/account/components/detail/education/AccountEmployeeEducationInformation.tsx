import { IEmployeeEducation } from '@account/classes/response/employeeEducation';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeEducation;
  employeeUid: string;
  // employeeName: string;
}

type AllProps = IOwnProps & InjectedIntlProps;

const accountEmployeeEducationInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(accountMessage.shared.field.titleInformation, {state: 'Education'})}
      />
      <CardContent>
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.employeeUid)}
          value={props.employeeUid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.uid)}
          value={data.uid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.degree)}
          value={data.degree ? data.degree.value : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.start)}
          value={data.start}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.end)}
          value={data.end ? data.end : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.institution)}
          value={data.institution}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.education.field.major)}
          value={data.major}
        />
        {
          props.data.changes &&
          <React.Fragment>
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
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const AccountEmployeeEducationInformation = compose<AllProps, IOwnProps>(injectIntl)(accountEmployeeEducationInformation);