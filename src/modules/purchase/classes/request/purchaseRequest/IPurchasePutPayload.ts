import { IBasePayload } from '@generic/interfaces';
import { IPurchaseItemPutPayload } from '@purchase/classes/request/purchaseRequest';

export interface IPurchasePutPayload extends IBasePayload {
  projectUid: string;
  notes?: string | null;
  date: string;
  currencyType: string;
  rate: number;
  advance?: number | null;
  customerUid: string;
  items?: IPurchaseItemPutPayload[] | null;
}