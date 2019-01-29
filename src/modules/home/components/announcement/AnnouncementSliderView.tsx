import { homeMessage } from '@home/locales/messages';
import { IStepperSource, Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import { Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { ISliderList } from '@lookup/classes/response/slider';
import { AnnouncementSliderProps } from './AnnouncementSlider';

export const AnnouncementSliderView: React.SFC<AnnouncementSliderProps> = props => {
  const GetImages = (slider: ISliderList[]): IStepperSource[] => {
    const stepper: IStepperSource[] = slider.map(item => ({
      label: item.name,
      imgPath: item.path && `${item.path.large}`
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
        props.sliderState.list.isLoading &&
        <Typography variant="body2">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }

      {
        !props.sliderState.list.isLoading &&
        props.sliderState.list.response &&
        props.sliderState.list.response.data &&
        <Stepper source={GetImages(props.sliderState.list.response.data)} autoplay={true} interval={7000} />
      }
    </div>
  );
};