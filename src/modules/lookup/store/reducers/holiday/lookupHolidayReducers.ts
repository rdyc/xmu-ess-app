import { lookupHolidayGetAllReducer } from './lookupHolidayGetAllReducer';
import { lookupHolidayGetByIdReducer } from './lookupHolidayGetByIdReducer';
import { lookupHolidayGetListReducer } from './lookupHolidayGetListReducer';

export const lookupHolidayReducers = {
  holidayGetAll: lookupHolidayGetAllReducer,
  holidayGetList: lookupHolidayGetListReducer,
  holidayGetById: lookupHolidayGetByIdReducer,
};