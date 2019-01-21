import achievementReducers from './achievement/achievementReducers';
import newsFeedReducers from './newsFeed/newsFeedReducers';

export const homeReducers = {
  ...achievementReducers,
  ...newsFeedReducers,
};