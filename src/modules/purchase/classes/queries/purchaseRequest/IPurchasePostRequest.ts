import { IBaseCommand } from '@generic/interfaces';
import { IPurchasePostPayload } from '@purchase/classes/request/purchaseRequest';

export interface IPurchasePostRequest extends IBaseCommand<IPurchasePostPayload> {
  companyUid: string;
  positionUid: string;
}