import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISettlementApprovalGetAllRequest,
  ISettlementApprovalGetByIdRequest,
} from '@purchase/classes/queries/settlementHistories';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';

export interface ISettlementApprovalState {
  projectGetAll: IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement>;
  projectGetById: IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail>;
}