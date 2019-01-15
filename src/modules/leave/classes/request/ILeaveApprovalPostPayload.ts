import { IBasePayload } from '@generic/interfaces';

export interface ILeaveApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string;
}