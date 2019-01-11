import { IBasePayload } from '@generic/interfaces';

export interface ITravelApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string;
}