import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  content: string;
}

type AllProps
  = IOwnProps
  & InjectedIntlProps;

const notifTemplateContent: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(notifMessage.template.section.contentTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.company.section.contentSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          rowsMax={20}
          label={props.intl.formatMessage(notifMessage.template.field.content)}
          value={props.content}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const NotifTemplateContent = compose<AllProps, IOwnProps>(injectIntl)(notifTemplateContent);