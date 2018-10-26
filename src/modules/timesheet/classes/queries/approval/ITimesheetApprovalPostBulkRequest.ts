import { IBaseCommand } from '@generic/interfaces';
import { ITimesheetApprovalPostBulkPayload } from '@timesheet/classes/request/approval';

export interface ITimesheetApprovalPostBulkRequest extends IBaseCommand<ITimesheetApprovalPostBulkPayload> {
  companyUid: string;
  positionUid: string;
}