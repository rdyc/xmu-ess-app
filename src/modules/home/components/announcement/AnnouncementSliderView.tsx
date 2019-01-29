import { homeMessage } from '@home/locales/messages';
import { IStepperSource, Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import { Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { IAnnouncement } from '@home/classes/response/announcement';
import { AnnouncementSliderProps } from './AnnouncementSlider';

export const AnnouncementSliderView: React.SFC<AnnouncementSliderProps> = props => {
  const GetImages = (slider: IAnnouncement[]): IStepperSource[] => {
    const stepper: IStepperSource[] = slider.map(item => ({
      label: item.name,
      imgPath: item.path && `${process.env.REACT_APP_CDN_URL}${item.path.large}`
    }));
    return stepper;
  };

  return (
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
        !props.announcementState.all.isLoading &&
        props.announcementState.all.response &&
        props.announcementState.all.response.data &&
        <Stepper source={GetImages(props.announcementState.all.response.data)} autoplay={true} interval={7000} />
      }
    </div>
  );
};