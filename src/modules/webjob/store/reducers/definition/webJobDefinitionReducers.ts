import { webJobDefinitionDeleteReducer } from './webJobDefinitionDeleteReducer';
import { webJobDefinitionGetAllReducer } from './webJobDefinitionGetAllReducer';
import { webJobDefinitionGetDetailReducer } from './webJobDefinitionGetDetailReducer';
import { webJobDefinitionGetListReducer } from './webJobDefinitionGetListReducer';
import { webJobDefinitionJobGetAllReducer } from './webJobDefinitionJobGetAllReducer';
import { webJobDefinitionJobGetListReducer } from './webJobDefinitionJobGetListReducer';
import { webJobDefinitionPostReducer } from './webJobDefinitionPostReducer';

export const webJobDefinitionReducers = {
  webJobDefinitionGetAll: webJobDefinitionGetAllReducer,
  webJobDefinitionGetList: webJobDefinitionGetListReducer,
  webJobDefinitionGetDetail: webJobDefinitionGetDetailReducer,
  webJobDefinitionPost: webJobDefinitionPostReducer,
  webJobDefinitionDelete: webJobDefinitionDeleteReducer,
  webJobDefinitionJobGetAll: webJobDefinitionJobGetAllReducer,
  webJobDefinitionJobGetList: webJobDefinitionJobGetListReducer
};