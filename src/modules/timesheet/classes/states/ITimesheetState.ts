import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITimesheetApprovalGetAllRequest,
  ITimesheetApprovalGetByIdRequest,
  // ITimesheetApprovalPostBulkRequest,
  ITimesheetApprovalPostRequest,
} from '@timesheet/classes/queries/approval';
import { 
  ITimesheetGetAllRequest,
  ITimesheetGetByIdRequest,
  ITimesheetMileagesGetAllRequest,
  ITimesheetPostRequest,
  ITimesheetPutRequest
} from '@timesheet/classes/queries/entry';
import {
  ITimesheet,
  ITimesheetDetail,
  ITimesheetMileages
} from '@timesheet/classes/response';

export interface ITimesheetState {
  // entry
  timesheetGetAll: IQueryCollectionState<ITimesheetGetAllRequest, ITimesheet>;
  timesheetGetById: IQuerySingleState<ITimesheetGetByIdRequest, ITimesheetDetail>;
  timesheetPost: IQuerySingleState<ITimesheetPostRequest, ITimesheet>;
  timesheetPut: IQuerySingleState<ITimesheetPutRequest, ITimesheet>;

  // approval
  timesheetApprovalGetAll: IQueryCollectionState<ITimesheetApprovalGetAllRequest, ITimesheet>;
  timesheetApprovalGetById: IQuerySingleState<ITimesheetApprovalGetByIdRequest, ITimesheetDetail>;
  timesheetApprovalPost: IQuerySingleState<ITimesheetApprovalPostRequest, boolean>;
  // timesheetApprovalPostBulk: IQuerySingleState<ITimesheetApprovalPostBulkRequest, boolean>;

  // mileages
  timesheetMileagesGetAll: IQueryCollectionState<ITimesheetMileagesGetAllRequest, ITimesheetMileages>;
}