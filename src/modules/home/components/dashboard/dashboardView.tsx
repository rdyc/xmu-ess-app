import { homeMessage } from '@home/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';

import { AchievementChart } from '../achievementChart';
import { AnnouncementSlider } from '../announcement';
import { NewsFeed } from '../newsFeed/NewsFeed';
import { Notification } from '../notification/Notification';
import { DashboardProps } from './Dashboard';

export const DashboardView: React.SFC<DashboardProps> = props => (
  <React.Fragment>
    <Notification />

    <div className={props.classes.marginWideBottom}>
      <Typography variant="h6">
        {props.intl.formatMessage(homeMessage.dashboard.section.imageSliderTitle)}
      </Typography>
    </div>
    <AnnouncementSlider />
    
    <div className={props.classes.marginWideBottom}>
      <Typography variant="h6">
        {props.intl.formatMessage(homeMessage.dashboard.section.achievementChartTitle)}
      </Typography>
    </div>
    <AchievementChart />

    <div className={props.classes.marginWideBottom}>
      <Typography variant="h6">
        {props.intl.formatMessage(homeMessage.dashboard.section.newsFeedtTitle)}
      </Typography>
    </div>
    <NewsFeed />
  </React.Fragment>
);