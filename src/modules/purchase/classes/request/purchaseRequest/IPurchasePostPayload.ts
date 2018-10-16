import { IBasePayload } from '@generic/interfaces';
import { IPurchaseItemPostPayload } from '@purchase/classes/request/purchaseRequest';

export interface IPurchasePostPayload extends IBasePayload {
  date: string;
  projectUid: string;
  currencyType: string;
  rate: number;
  notes: string;
  advance?: number | null;
  customerUid: string;
  items?: IPurchaseItemPostPayload[] | null;
}