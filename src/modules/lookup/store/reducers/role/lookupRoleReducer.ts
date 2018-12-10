import { lookupRoleDeleteReducer } from './lookupRoleDeleteReducer';
import { lookupRoleGetAllReducer } from './lookupRoleGetAllReducer';
import { lookupRoleGetByIdReducer } from './lookupRoleGetByIdReducer';
import { lookupRoleGetListReducer } from './lookupRoleGetListReducer';
import { lookupRolePostReducer } from './lookupRolePostReducer';
import { lookupRolePutReducer } from './lookupRolePutReducer';

export const lookupRoleReducers = {
  lookupRoleGetAll: lookupRoleGetAllReducer,
  lookupRoleGetList: lookupRoleGetListReducer,
  lookupRoleGetById: lookupRoleGetByIdReducer,
  lookupRolePost: lookupRolePostReducer,
  lookupRolePut: lookupRolePutReducer,
  lookupRoleDelete: lookupRoleDeleteReducer,
};