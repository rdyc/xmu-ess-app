import { IBasePayload } from '@generic/interfaces';
import { ITimesheetApprovalItem } from './ITimesheetApprovalItem';

export interface ITimesheetApprovalPostBulkPayload extends IBasePayload {
  timesheetUids: ITimesheetApprovalItem[];
  isApproved: boolean;
  remark?: string;
}