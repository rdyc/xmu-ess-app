import { layoutMessage } from '@layout/locales/messages';
import { Avatar, Card, CardHeader } from '@material-ui/core';
import { Security } from '@material-ui/icons';
import * as React from 'react';

import { ForbiddenProps } from './Forbidden';

export const ForbiddenView: React.SFC<ForbiddenProps> = props => (
  <Card square>
    <CardHeader 
      avatar={
          <Avatar>
            <Security fontSize="large" />
          </Avatar>
        }
      title={props.intl.formatMessage(layoutMessage.content.forbiddenTitle)}
      subheader={props.intl.formatMessage(layoutMessage.content.forbiddenSubHeader)}
    />
  </Card>
);