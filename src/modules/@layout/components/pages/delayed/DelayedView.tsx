import { layoutMessage } from '@layout/locales/messages';
import { Fade, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { DelayedProps } from './Delayed';

export const DelayedView: React.SFC<DelayedProps> = props => (
  <React.Fragment>
    {
      props.hidden &&
      <Typography 
        variant="caption" 
        align="center"
        className={props.classes.flex}
      >
        <FormattedMessage {...layoutMessage.text.processing} />
      </Typography>
    }

    {
      !props.hidden &&
      <Fade in={true} timeout={200}>
        {props.children}
      </Fade>
    }
  </React.Fragment>
);