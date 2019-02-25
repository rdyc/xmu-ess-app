import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeTraining;
  employeeUid: string;
  // employeeName: string;
}

type AllProps = IOwnProps & InjectedIntlProps;

const accountEmployeeTrainingInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(accountMessage.shared.field.titleInformation, {state: 'Training'})}
      />
      <CardContent>
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.employeeUid)}
          value={props.employeeUid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.uid)}
          value={data.uid}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.name)}
          value={data.name}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.trainingType)}
          value={data.training ? data.training.value : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.certificationType)}
          value={data.certification ? data.certification.value : 'N/A'}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.start)}
          value={props.intl.formatDate(data.start, GlobalFormat.Date)}
        />
        <TextField 
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.end)}
          value={data.end ? props.intl.formatDate(data.end, GlobalFormat.Date) : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(accountMessage.training.field.organizer)}
          value={data.organizer}
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

export const AccountEmployeeTrainingInformation = compose<AllProps, IOwnProps>(injectIntl)(accountEmployeeTrainingInformation);