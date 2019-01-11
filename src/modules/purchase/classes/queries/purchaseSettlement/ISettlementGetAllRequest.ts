import { ISettlementGetAllFilter } from '@purchase/classes/filters/purchaseSettlement';

export interface ISettlementGetAllRequest {
  filter?: ISettlementGetAllFilter;
}