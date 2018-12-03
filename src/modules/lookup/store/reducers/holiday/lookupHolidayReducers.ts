import { lookupHolidayGetAllReducer } from './lookupHolidayGetAllReducer';
import { lookupHolidayGetByIdReducer } from './lookupHolidayGetByIdReducer';
import { lookupHolidayGetListReducer } from './lookupHolidayGetListReducer';
import { lookupHolidayPostReducer } from './lookupHolidayPostReducer';
import { lookupHolidayPutReducer } from './lookupHolidayPutReducer';

export const lookupHolidayReducers = {
  holidayGetAll: lookupHolidayGetAllReducer,
  holidayGetList: lookupHolidayGetListReducer,
  holidayGetById: lookupHolidayGetByIdReducer,
  holidayPost: lookupHolidayPostReducer,
  holidayPut: lookupHolidayPutReducer,
};