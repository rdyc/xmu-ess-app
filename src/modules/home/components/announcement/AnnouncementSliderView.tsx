import { homeMessage } from '@home/locales/messages';
import { Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import { Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { AnnouncementSliderProps } from './AnnouncementSlider';

export const AnnouncementSliderView: React.SFC<AnnouncementSliderProps> = props => (
  <div className={props.classes.marginFarBottom}>
    {
      props.useToolbar &&
      <Toolbar className={props.classes.toolbarCustom}>
        <Typography variant="h6" className={props.classes.flex} color="inherit">
          {props.intl.formatMessage(homeMessage.dashboard.section.imageSliderTitle)}
        </Typography>
      </Toolbar>
    }

    {
      props.announcementState.all.isLoading &&
      <Typography variant="body2">
        {props.intl.formatMessage(layoutMessage.text.loading)}
      </Typography>
    }

    {
      props.images &&
      <Stepper source={props.images} autoplay={true} interval={7000} />
    }
  </div>
);