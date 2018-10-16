import { IBaseCommand } from '@generic/interfaces';
import { IPurchaseApprovalPostPayload } from '@purchase/classes/request/purchaseHistories';

export interface IPurchaseApprovalPostRequest extends IBaseCommand<IPurchaseApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  purchaseUid: string;
}