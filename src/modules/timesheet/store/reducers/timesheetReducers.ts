import {
  timesheetApprovalGetAllReducer,
  timesheetApprovalGetByIdReducer
} from '@timesheet/store/reducers/approval';
import {
  timesheetGetAllReducer,
  timesheetGetByIdReducer,
  timesheetMileagesGetAllReducer,
  timesheetPostReducer,
  timesheetPutReducer
} from '@timesheet/store/reducers/entry';

const timesheetReducers = {
  timesheetGetAll: timesheetGetAllReducer,
  timesheetGetById: timesheetGetByIdReducer,
  timesheetPost: timesheetPostReducer,
  timesheetPut: timesheetPutReducer,
  timesheetApprovalGetAll: timesheetApprovalGetAllReducer,
  timesheetApprovalGetById: timesheetApprovalGetByIdReducer,
  timesheetMileagesGetAll: timesheetMileagesGetAllReducer,
};

export default timesheetReducers;
