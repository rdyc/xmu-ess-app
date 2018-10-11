import { projectGetAllReducer, projectGetByIdReducer, projectGetListReducer } from '@common/store/reducers/project';

const projectReducers = {
  commonProjectGetAll: projectGetAllReducer,
  commonProjectGetList: projectGetListReducer,
  commonProjectGetById: projectGetByIdReducer
};

export default projectReducers;