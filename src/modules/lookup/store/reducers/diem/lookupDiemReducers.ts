import { lookupDiemDeleteReducer } from './lookupDiemDeleteReducer';
import { lookupDiemGetAllReducer } from './lookupDiemGetAllReducer';
import { lookupDiemGetByIdReducer } from './lookupDiemGetByIdReducer';
import { lookupDiemGetListReducer } from './lookupDiemGetListReducer';
import { lookupDiemPostReducer } from './lookupDiemPostReducer';
import { lookupDiemPutReducer } from './lookupDiemPutReducer';

export const lookupDiemReducers = {
  lookupDiemGetAll: lookupDiemGetAllReducer,
  lookupDiemGetList: lookupDiemGetListReducer,
  lookupDiemGetById: lookupDiemGetByIdReducer,
  lookupDiemPost: lookupDiemPostReducer,
  lookupDiemPut: lookupDiemPutReducer,
  lookupDiemDelete: lookupDiemDeleteReducer,
};