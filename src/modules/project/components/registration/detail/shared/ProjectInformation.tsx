import { WorkflowStatusType } from '@common/classes/types';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IProjectDetail } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IProjectDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const projectInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)}
      subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.statusType)}
        value={props.data.status ? props.data.status.value : props.data.statusType}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.ownerEmployeeUid)}
        value={props.data.owner ? props.data.owner.fullName : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.customerUid)}
        value={props.data.customer ? props.data.customer.name : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.projectType)}
        value={props.data.project ? props.data.project.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.name)}
        value={props.data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline={true}
        label={props.intl.formatMessage(projectMessage.registration.field.description)}
        value={props.data.description || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.contractNumber)}
        value={props.data.contractNumber || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.start)}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.end)}
        value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.currencyType)}
        value={props.data.currency ? props.data.currency.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.rate)}
        value={props.intl.formatNumber(props.data.rate || 0)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.valueUsd)}
        value={props.intl.formatNumber(props.data.valueUsd)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.valueIdr)}
        value={props.intl.formatNumber(props.data.valueIdr || 0)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.hours)}
        value={props.intl.formatNumber(props.data.maxHours)}
      />

      {
        props.data.statusType === WorkflowStatusType.Rejected &&
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline={true}
          label={props.intl.formatMessage(projectMessage.registration.field.rejectedReason)}
          value={props.data.rejectedReason || 'N/A'}
        />
      }

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

export const ProjectInformation = compose<AllProps, OwnProps>(
  injectIntl
)(projectInformation);