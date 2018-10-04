import {
  projectGetAllReducer,
  projectGetByIdReducer,
  projectGetListReducer,
  projectPostReducer,
  projectPutReducer,
} from '@project/store/reducers';

const projectReducers = {
  projectGetAll: projectGetAllReducer,
  projectGetList: projectGetListReducer,
  projectGetById: projectGetByIdReducer,
  projectPost: projectPostReducer,
  projectPut: projectPutReducer,
};

export default projectReducers;