import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISettlementApprovalGetAllRequest,
  ISettlementApprovalGetByIdRequest,
} from '@purchase/classes/queries/settlementHistories';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';

export interface ISettlementApprovalState {
  settlementApprovalGetAll: IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement>;
  settlementApprovalGetById: IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail>;
}