import { activityGetAllReducer, activityGetByIdReducer, activityGetListReducer } from '@common/store/reducers/activity';

const activityReducers = {
  commonActivityGetAll: activityGetAllReducer,
  commonActivityGetList: activityGetListReducer,
  commonActivityGetById: activityGetByIdReducer
};

export default activityReducers;