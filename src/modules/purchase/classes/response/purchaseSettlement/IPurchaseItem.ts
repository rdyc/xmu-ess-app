import { IPurchaseItemRequest } from '../purchaseRequest';

export interface IPurchaseItem extends IPurchaseItemRequest {
  actualValue: number;
  varianceValue: number;
}
