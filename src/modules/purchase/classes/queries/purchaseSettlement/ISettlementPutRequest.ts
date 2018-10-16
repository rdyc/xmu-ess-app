import { IBaseCommand } from '@generic/interfaces';
import { ISettlementPutPayload } from '@purchase/classes/request/purchaseSettlement';

export interface ISettlementPutRequest extends IBaseCommand<ISettlementPutPayload> {
  companyUid: string;
  positionUid: string;
  purchaseUid: string;
}