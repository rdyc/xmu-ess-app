import { IBasePayload } from '@generic/interfaces';
import { IPurchaseItemPutPayload } from '@purchase/classes/request/purchaseRequest';

export interface IPurchasePutPayload extends IBasePayload {
  projectUid: string;
  notes?: string;
  date: string;
  currencyType: string;
  rate: number;
  advance?: number;
  customerUid: string;
  items?: IPurchaseItemPutPayload[];
}