import { IBasePayload } from '@generic/interfaces';

export interface ITimesheetApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string | null;
}