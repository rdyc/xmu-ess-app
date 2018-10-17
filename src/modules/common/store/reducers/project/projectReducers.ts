import { projectGetAllReducer, projectGetByIdReducer, projectGetListReducer } from '@common/store/reducers/project';

const projectReducers = {
  commonProjectAll: projectGetAllReducer,
  commonProjectList: projectGetListReducer,
  commonProjectDetail: projectGetByIdReducer
};

export default projectReducers;