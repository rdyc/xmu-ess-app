import { IBasePayload } from '@generic/interfaces';

export interface IPurchaseApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string;
}