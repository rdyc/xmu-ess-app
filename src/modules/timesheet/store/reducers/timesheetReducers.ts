import {
  timesheetGetAllReducer,
  timesheetGetByIdReducer,
  timesheetPostReducer,
  timesheetPutReducer,
} from '@timesheet/store/reducers';

const timesheetReducers = {
  timesheetGetAll: timesheetGetAllReducer,
  timesheetGetById: timesheetGetByIdReducer,
  timesheetPost: timesheetPostReducer,
  timesheetPut: timesheetPutReducer,
};

export default timesheetReducers;