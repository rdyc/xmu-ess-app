import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISettlementGetAllRequest,
  ISettlementGetByIdRequest,
} from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';

export interface ISettlementState {
  projectGetAll: IQueryCollectionState<ISettlementGetAllRequest, ISettlement>;
  projectGetById: IQuerySingleState<ISettlementGetByIdRequest, ISettlementDetail>;
}