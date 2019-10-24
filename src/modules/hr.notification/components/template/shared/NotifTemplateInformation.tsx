import { INotifTemplateDetail } from '@hr.notification/classes/response';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: INotifTemplateDetail;
}

type AllProps
  = IOwnProps
  & InjectedIntlProps;

const notifTemplateInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(notifMessage.template.section.infoTitle)}
      // subheader={props.intl.formatMessage(lookupMessage.company.section.infoSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(notifMessage.template.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(notifMessage.template.field.name)}
        value={props.data.name}
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

export const NotifTemplateInformation = compose<AllProps, IOwnProps>(
  injectIntl
)(notifTemplateInformation);