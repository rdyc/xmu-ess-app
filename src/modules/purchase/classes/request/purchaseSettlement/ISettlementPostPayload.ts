import { IBasePayload } from '@generic/interfaces';
import { ISettlementItemPostPayload } from '@purchase/classes/request/purchaseSettlement';

export interface ISettlementPostPayload extends IBasePayload {
  date: string;
  notes?: string | null;
  items?: ISettlementItemPostPayload[] | null;
}