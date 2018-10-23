import { IPurchaseGetAllFilter } from '@purchase/classes/filters/purchaseRequest';

export interface IPurchaseGetAllRequest {
  readonly filter: IPurchaseGetAllFilter | undefined;
}