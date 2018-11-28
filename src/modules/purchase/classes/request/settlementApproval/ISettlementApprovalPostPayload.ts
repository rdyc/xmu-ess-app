import { IBasePayload } from '@generic/interfaces';

export interface ISettlementApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string | null;
}