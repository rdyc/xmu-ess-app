import { IBasePayload } from '@generic/interfaces';
import { ISettlementItemPutPayload } from '@purchase/classes/request/purchaseSettlement';

export interface ISettlementPutPayload extends IBasePayload {
  date: string;
  notes?: string | null;
  items?: ISettlementItemPutPayload[] | null;
}