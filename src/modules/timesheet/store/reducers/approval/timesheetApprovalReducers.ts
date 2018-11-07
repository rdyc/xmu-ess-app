import { timesheetApprovalGetAllReducer } from './timesheetApprovalGetAllReducer';
import { timesheetApprovalGetByIdReducer } from './timesheetApprovalGetByIdReducer';
import { timesheetApprovalPostBulkReducer } from './timesheetApprovalPostBulkReducers';
import { timesheetApprovalPostReducer } from './timesheetApprovalPostReducers';

const timesheetApprovalReducers = {
  timesheetApprovalGetAll: timesheetApprovalGetAllReducer,
  timesheetApprovalGetById: timesheetApprovalGetByIdReducer,
  timesheetApprovalPost: timesheetApprovalPostReducer,
  timesheetApprovalPostBulk: timesheetApprovalPostBulkReducer,
};

export default timesheetApprovalReducers;