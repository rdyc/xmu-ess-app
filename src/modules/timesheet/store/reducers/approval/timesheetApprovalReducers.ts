import { timesheetApprovalGetAllReducer } from './timesheetApprovalGetAllReducer';
import { timesheetApprovalGetByIdReducer } from './timesheetApprovalGetByIdReducer';
import { timesheetApprovalHistoryGetAllReducer } from './timesheetApprovalHistoryGetAllReducer';
import { timesheetApprovalHistoryGetByIdReducer } from './timesheetApprovalHistoryGetByIdReducer';
import { timesheetApprovalPostBulkReducer } from './timesheetApprovalPostBulkReducers';
import { timesheetApprovalPostReducer } from './timesheetApprovalPostReducers';

const timesheetApprovalReducers = {
  timesheetApprovalGetAll: timesheetApprovalGetAllReducer,
  timesheetApprovalGetById: timesheetApprovalGetByIdReducer,
  timesheetApprovalPost: timesheetApprovalPostReducer,
  timesheetApprovalPostBulk: timesheetApprovalPostBulkReducer,

  timesheetApprovalHistoryGetAll: timesheetApprovalHistoryGetAllReducer,
  timesheetApprovalHistoryGetById: timesheetApprovalHistoryGetByIdReducer
};

export default timesheetApprovalReducers;