import { IBaseCommand } from '@generic/interfaces';
import { ITimesheetApprovalPostPayload } from '@timesheet/classes/request/approval';

export interface ITimesheetApprovalPostRequest extends IBaseCommand<ITimesheetApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  timesheetUid: string;
}