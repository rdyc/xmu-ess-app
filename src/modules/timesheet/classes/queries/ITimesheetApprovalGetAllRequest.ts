import { ITimesheetApprovalGetAllFilter } from '../filters';

export interface ITimesheetApprovalGetAllRequest {
  readonly filter: ITimesheetApprovalGetAllFilter | undefined;
}