import { Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';

import { AnnouncementSliderProps } from './AnnouncementSlider';

export const AnnouncementSliderView: React.SFC<AnnouncementSliderProps> = props => (
  <React.Fragment>
    {
      props.announcementState.all.isLoading &&
      <Typography variant="body2">
        {props.intl.formatMessage(layoutMessage.text.loading)}
      </Typography>
    }

    {
      props.images &&
      <Stepper source={props.images} />
    }
  </React.Fragment>
);