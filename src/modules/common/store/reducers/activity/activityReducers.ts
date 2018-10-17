import { activityGetAllReducer, activityGetByIdReducer, activityGetListReducer } from '@common/store/reducers/activity';

const activityReducers = {
  commonActivityAll: activityGetAllReducer,
  commonActivityList: activityGetListReducer,
  commonActivityDetail: activityGetByIdReducer
};

export default activityReducers;