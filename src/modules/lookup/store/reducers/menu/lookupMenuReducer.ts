import { lookupMenuGetAllReducer } from './lookupMenuGetAllReducer';
import { lookupMenuGetByIdReducer } from './lookupMenuGetByIdReducer';
import { lookupMenuGetListReducer } from './lookupMenuGetListReducer';

export const lookupMenuReducers = {
  lookupMenuGetAll: lookupMenuGetAllReducer,
  lookupMenuGetList: lookupMenuGetListReducer,
  lookupMenuGetById: lookupMenuGetByIdReducer,
};