import { lookupCompanyGetAllReducer } from './lookupCompanyGetAllReducer';
import { lookupCompanyGetByIdReducer } from './lookupCompanyGetByIdReducer';
import { lookupCompanyGetListReducer } from './lookupCompanyGetListReducer';

export const lookupCompanyReducers = {
  lookupCompanyGetAll: lookupCompanyGetAllReducer,
  lookupCompanyGetList: lookupCompanyGetListReducer,
  lookupCompanyGetById: lookupCompanyGetByIdReducer,
};