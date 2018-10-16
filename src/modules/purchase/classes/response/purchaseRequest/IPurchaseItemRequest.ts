import { IBaseChanges } from '@generic/interfaces';

export interface IPurchaseItemRequest {
  uid: string;
  purchaseUid: string;
  description: string;
  requestValue: number | null;
  changes: IBaseChanges | null;
}