import { lookupEmployeeLevelDeleteReducer } from './lookupEmployeeLevelDeleteReducer';
import { lookupEmployeeLevelGetAllReducer } from './lookupEmployeeLevelGetAllReducer';
import { lookupEmployeeLevelGetByIdReducer } from './lookupEmployeeLevelGetByIdReducer';
import { lookupEmployeeLevelGetListReducer } from './lookupEmployeeLevelGetListReducer';
import { lookupEmployeeLevelPostReducer } from './lookupEmployeeLevelPostReducer';
import { lookupEmployeeLevelPutReducer } from './lookupEmployeeLevelPutReducer';

export const lookupEmployeeLevelReducers = {
  employeeLevelGetAll: lookupEmployeeLevelGetAllReducer,
  employeeLevelGetList: lookupEmployeeLevelGetListReducer,
  employeeLevelGetById: lookupEmployeeLevelGetByIdReducer,
  employeeLevelPost: lookupEmployeeLevelPostReducer,
  employeeLevelPut: lookupEmployeeLevelPutReducer,
  employeeLevelDelete: lookupEmployeeLevelDeleteReducer,
};