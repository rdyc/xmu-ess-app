import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITimesheetApprovalGetAllRequest,
  ITimesheetApprovalGetByIdRequest,
  ITimesheetGetAllRequest,
  ITimesheetGetByIdRequest,
  ITimesheetPostRequest,
  ITimesheetPutRequest
} from '@timesheet/classes/queries';
import {
  ITimesheet,
  ITimesheetDetail
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
}