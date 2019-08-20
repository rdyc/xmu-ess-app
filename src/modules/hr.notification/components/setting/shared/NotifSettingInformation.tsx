import { INotifSettingDetail } from '@hr.notification/classes/response';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: INotifSettingDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const notifSettingInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(notifMessage.setting.section.infoTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.company.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(notifMessage.setting.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(notifMessage.setting.field.companyUid)}
          value={props.data.company && props.data.company.name || props.data.companyUid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(notifMessage.setting.field.class)}
          value={props.data.class}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(notifMessage.setting.field.templateUid)}
          value={props.data.template && props.data.template.name || props.data.templateUid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(notifMessage.setting.field.subject)}
          value={props.data.subject}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          rows={4}
          label={props.intl.formatMessage(notifMessage.setting.field.to)}
          value={props.data.to.join(', ') || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          rows={4}
          label={props.intl.formatMessage(notifMessage.setting.field.cc)}
          value={props.data.cc.join(', ') || 'N/A'}
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

export const NotifSettingInformation = compose<AllProps, OwnProps>(injectIntl)(notifSettingInformation);