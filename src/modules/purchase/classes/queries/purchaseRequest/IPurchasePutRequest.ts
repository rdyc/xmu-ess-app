import { IBaseCommand } from '@generic/interfaces';
import { IPurchasePutPayload } from '@purchase/classes/request/purchaseRequest';

export interface IPurchasePutRequest extends IBaseCommand<IPurchasePutPayload> {
  companyUid: string;
  positionUid: string;
  purchaseUid: string;
}