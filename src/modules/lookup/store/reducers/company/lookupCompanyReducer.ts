import { lookupCompanyDeleteReducer } from './lookupCompanyDeleteReducer';
import { lookupCompanyGetAllReducer } from './lookupCompanyGetAllReducer';
import { lookupCompanyGetByIdReducer } from './lookupCompanyGetByIdReducer';
import { lookupCompanyGetListReducer } from './lookupCompanyGetListReducer';
import { lookupCompanyPostReducer } from './lookupCompanyPostReducer';
import { lookupCompanyPutReducer } from './lookupCompanyPutReducer';

export const lookupCompanyReducers = {
  lookupCompanyGetAll: lookupCompanyGetAllReducer,
  lookupCompanyGetList: lookupCompanyGetListReducer,
  lookupCompanyGetById: lookupCompanyGetByIdReducer,
  lookupCompanyPost: lookupCompanyPostReducer,
  lookupCompanyPut: lookupCompanyPutReducer,
  lookupCompanyDelete: lookupCompanyDeleteReducer,
};