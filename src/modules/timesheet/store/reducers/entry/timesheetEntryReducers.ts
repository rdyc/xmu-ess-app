import {
  timesheetEntryGetAllReducer,
  timesheetEntryGetByIdReducer,
  timesheetEntryPostReducer,
  timesheetEntryPutReducer,
  timesheetMileagesGetAllReducer
} from '@timesheet/store/reducers/entry';

const timesheetEntryReducers = {
  timesheetGetAll: timesheetEntryGetAllReducer,
  timesheetGetById: timesheetEntryGetByIdReducer,
  timesheetPost: timesheetEntryPostReducer,
  timesheetPut: timesheetEntryPutReducer,
  timesheetMileagesGetAll: timesheetMileagesGetAllReducer,
};

export default timesheetEntryReducers;