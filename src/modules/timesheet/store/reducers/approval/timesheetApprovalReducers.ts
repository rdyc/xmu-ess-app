import { timesheetApprovalGetAllReducer } from './timesheetApprovalGetAllReducer';
import { timesheetApprovalGetByIdReducer } from './timesheetApprovalGetByIdReducer';
import { timesheetApprovalPostReducer } from './timesheetApprovalPostReducers';

const timesheetApprovalReducers = {
  timesheetApprovalGetAll: timesheetApprovalGetAllReducer,
  timesheetApprovalGetById: timesheetApprovalGetByIdReducer,
  timesheetApprovalPost: timesheetApprovalPostReducer,
};

export default timesheetApprovalReducers;