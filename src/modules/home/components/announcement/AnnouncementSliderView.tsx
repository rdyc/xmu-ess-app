import { IAnnouncement } from '@home/classes/response/announcement';
import { homeMessage } from '@home/locales/messages';
import { Preloader } from '@layout/components/preloader';
import { IStepperSource, Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import { Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { AnnouncementSliderProps } from './AnnouncementSlider';

export const AnnouncementSliderView: React.SFC<AnnouncementSliderProps> = props => {
  const getImages = (slider: IAnnouncement[]): IStepperSource[] => {
    const stepper: IStepperSource[] = slider.map(item => ({
      label: item.name,
      imgPath: item.path && `${item.path.medium}`,
      imgPathFull: item.path && `${item.path.large}`,
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

      <Preloader 
        show={props.announcementState.all.isLoading} 
        label={props.intl.formatMessage(layoutMessage.text.loading)}
      >
        {
          !props.announcementState.all.isLoading &&
          props.announcementState.all.response &&
          props.announcementState.all.response.data &&
          <Stepper source={getImages(props.announcementState.all.response.data)} autoplay={true} interval={7000} showFull={true} />
        }
      </Preloader>
    </div>
  );
};