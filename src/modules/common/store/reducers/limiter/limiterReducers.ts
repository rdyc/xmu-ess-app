import {
  limiterGetAllReducer,
  limiterGetByIdReducer,
  limiterGetListReducer
} from '@common/store/reducers/limiter';

const limiterReducers = {
  commonLimiterAll: limiterGetAllReducer,
  commonLimiterList: limiterGetListReducer,
  commonLimiterDetail: limiterGetByIdReducer
};

export default limiterReducers;
