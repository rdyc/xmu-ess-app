import * as React from 'react';

import { AchievementChart } from '../achievementChart';
import { AnnouncementSlider } from '../announcement';
import { NewsFeed } from '../newsFeed/NewsFeed';
import { Notification } from '../notification/Notification';
import { DashboardProps } from './Dashboard';

export const DashboardView: React.SFC<DashboardProps> = props => (
  <React.Fragment>
    <Notification useToolbar={true} />

    <AnnouncementSlider useToolbar={true} />

    <AchievementChart useToolbar={true} />

    <NewsFeed useToolbar={true} />
  </React.Fragment>
);