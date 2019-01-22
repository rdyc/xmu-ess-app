import achievementReducers from './achievement/achievementReducers';
import announcementReducers from './announcement/announcementReducers';
import newsFeedReducers from './newsFeed/newsFeedReducers';

export const homeReducers = {
  ...achievementReducers,
  ...announcementReducers,
  ...newsFeedReducers,
};