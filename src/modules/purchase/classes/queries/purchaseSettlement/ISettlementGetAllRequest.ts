import { ISettlementGetAllFilter } from '@purchase/classes/filters/purchaseSettlement';

export interface ISettlementGetAllRequest {
  readonly filter: ISettlementGetAllFilter | undefined;
}