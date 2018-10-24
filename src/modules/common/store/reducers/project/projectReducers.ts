import { projectGetAllReducer, projectGetByIdReducer, projectGetListReducer } from '@common/store/reducers/project';

export const commonProjectReducers = {
  commonProjectAll: projectGetAllReducer,
  commonProjectList: projectGetListReducer,
  commonProjectDetail: projectGetByIdReducer
};
