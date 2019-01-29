import achievementReducers from './achievement/achievementReducers';
import announcementReducers from './announcement/announcementReducers';
import newsFeedReducers from './newsFeed/newsFeedReducers';
import sliderReducers from './slider/sliderReducers';

export const homeReducers = {
  ...achievementReducers,
  ...announcementReducers,
  ...newsFeedReducers,
  ...sliderReducers
};