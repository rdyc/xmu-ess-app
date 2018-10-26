import { IBasePayload } from '@generic/interfaces';

export interface ITimesheetApprovalPostBulkPayload extends IBasePayload {
  timesheetUids: string[];
  isApproved: boolean;
  remark?: string | null;
}