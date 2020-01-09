import { newsFeedGetListReducer } from './newsFeedGetListReducer';
import { newsFeedGetReducer } from './newsFeedGetReducer';

const newsFeedReducers = {
  newsFeedGet: newsFeedGetReducer,
  newsFeedGetList: newsFeedGetListReducer
};

export default newsFeedReducers;