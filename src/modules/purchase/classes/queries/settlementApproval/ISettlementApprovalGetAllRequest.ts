import { ISettlementApprovalGetAllFilter } from '@purchase/classes/filters/settlementApproval';

export interface ISettlementApprovalGetAllRequest {
  readonly filter: ISettlementApprovalGetAllFilter | undefined;
}