import { IBasePayload } from '@generic/interfaces';

export interface IFinanceApprovalPostPayload extends IBasePayload {
  statusType: string;
  notes: string;
}