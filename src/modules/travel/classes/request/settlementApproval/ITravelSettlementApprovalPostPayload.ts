import { IBasePayload } from '@generic/interfaces';

export interface ITravelSettlementApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string | null;
}