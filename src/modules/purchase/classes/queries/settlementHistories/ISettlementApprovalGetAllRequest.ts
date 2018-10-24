import { ISettlementApprovalGetAllFilter } from '@purchase/classes/filters/settlementHistories';

export interface ISettlementApprovalGetAllRequest {
  readonly filter: ISettlementApprovalGetAllFilter | undefined;
}