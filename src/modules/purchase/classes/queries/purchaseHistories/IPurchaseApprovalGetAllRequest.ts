import { IPurchaseApprovalGetAllFilter } from '@purchase/classes/filters/purchaseHistories';

export interface IPurchaseApprovalGetAllRequest {
  readonly filter: IPurchaseApprovalGetAllFilter | undefined;
}