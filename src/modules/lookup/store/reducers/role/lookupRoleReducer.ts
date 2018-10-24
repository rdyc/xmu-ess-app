import { lookupRoleGetAllReducer } from './lookupRoleGetAllReducer';
import { lookupRoleGetByIdReducer } from './lookupRoleGetByIdReducer';
import { lookupRoleGetListReducer } from './lookupRoleGetListReducer';

export const lookupRoleReducers = {
  lookupRoleGetAll: lookupRoleGetAllReducer,
  lookupRoleGetList: lookupRoleGetListReducer,
  lookupRoleGetById: lookupRoleGetByIdReducer,
};