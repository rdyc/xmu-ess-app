import { IBaseCommand } from '@generic/interfaces';
import { ISettlementPostPayload } from '@purchase/classes/request/purchaseSettlement';

export interface ISettlementPostRequest extends IBaseCommand<ISettlementPostPayload> {
  companyUid: string;
  positionUid: string;
  purchaseUid: string;
}