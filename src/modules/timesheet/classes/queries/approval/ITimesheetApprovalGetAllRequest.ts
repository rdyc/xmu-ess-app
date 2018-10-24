import { ITimesheetApprovalGetAllFilter } from '@timesheet/classes/filters';

export interface ITimesheetApprovalGetAllRequest {
  readonly filter: ITimesheetApprovalGetAllFilter | undefined;
}