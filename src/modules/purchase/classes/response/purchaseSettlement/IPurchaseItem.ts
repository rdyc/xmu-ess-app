import { IPurchaseItemRequest } from '../purchaseRequest';

export interface IPurchaseItem extends IPurchaseItemRequest {
  actualValue: number | null;
  varianceValue: number | null;
}
