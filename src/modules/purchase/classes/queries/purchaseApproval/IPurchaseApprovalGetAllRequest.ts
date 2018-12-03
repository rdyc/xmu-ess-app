import { IPurchaseApprovalGetAllFilter } from '@purchase/classes/filters/purchaseApproval';

export interface IPurchaseApprovalGetAllRequest {
  readonly filter: IPurchaseApprovalGetAllFilter | undefined;
}