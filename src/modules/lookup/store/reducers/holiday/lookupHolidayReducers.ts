import { lookupHolidayDeleteReducer } from './lookupHolidayDeleteReducer';
import { lookupHolidayGetAllReducer } from './lookupHolidayGetAllReducer';
import { lookupHolidayGetByIdReducer } from './lookupHolidayGetByIdReducer';
import { lookupHolidayGetListReducer } from './lookupHolidayGetListReducer';
import { lookupHolidayPostReducer } from './lookupHolidayPostReducer';
import { lookupHolidayPutReducer } from './lookupHolidayPutReducer';

export const lookupHolidayReducers = {
  lookupHolidayGetAll: lookupHolidayGetAllReducer,
  lookupHolidayGetList: lookupHolidayGetListReducer,
  lookupHolidayGetById: lookupHolidayGetByIdReducer,
  lookupHolidayPost: lookupHolidayPostReducer,
  lookupHolidayPut: lookupHolidayPutReducer,
  lookupHolidayDelete: lookupHolidayDeleteReducer
};