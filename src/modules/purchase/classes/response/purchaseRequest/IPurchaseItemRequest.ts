import { IBaseChanges } from '@generic/interfaces';

export interface IPurchaseItemRequest {
  uid: string;
  purchaseUid: string;
  description: string;
  requestValue: number;
  changes?: IBaseChanges;
}