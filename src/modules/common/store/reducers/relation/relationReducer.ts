import { relationGetAllReducer, relationGetByIdReducer, relationGetListReducer } from '@common/store/reducers/relation';

const relationReducers = {
  commonRelationAll: relationGetAllReducer,
  commonRelationList: relationGetListReducer,
  commonRelationDetail: relationGetByIdReducer
};

export default relationReducers;