import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest,
  IPurchaseApprovalPostRequest,
} from '@purchase/classes/queries/purchaseHistories';
import {
  IPurchaseGetAllRequest,
  IPurchaseGetByIdRequest,
  IPurchasePostRequest,
  IPurchasePutRequest,
} from '@purchase/classes/queries/purchaseRequest';
import {
  ISettlementGetAllRequest,
  ISettlementGetByIdRequest,
  ISettlementPostRequest,
  ISettlementPutRequest,
} from '@purchase/classes/queries/purchaseSettlement';
import {
  ISettlementApprovalGetAllRequest,
  ISettlementApprovalGetByIdRequest,
  ISettlementApprovalPostRequest,
} from '@purchase/classes/queries/settlementHistories';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';

export interface IPurchaseState {
  purchaseGetAll: IQueryCollectionState<IPurchaseGetAllRequest, IPurchase>;
  purchaseGetById: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
  purchasePost: IQuerySingleState<IPurchasePostRequest, IPurchaseDetail>;
  purchasePut: IQuerySingleState<IPurchasePutRequest, IPurchaseDetail>;
  purchaseApprovalGetAll: IQueryCollectionState<IPurchaseApprovalGetAllRequest, IPurchase>;
  purchaseApprovalGetById: IQuerySingleState<IPurchaseApprovalGetByIdRequest, IPurchaseDetail>;
  purchaseApprovalPost: IQuerySingleState<IPurchaseApprovalPostRequest, boolean>;
  settlementGetAll: IQueryCollectionState<ISettlementGetAllRequest, ISettlement>;
  settlementGetById: IQuerySingleState<ISettlementGetByIdRequest, ISettlementDetail>;
  settlementPost: IQuerySingleState<ISettlementPostRequest, ISettlementDetail>;
  settlementPut: IQuerySingleState<ISettlementPutRequest, ISettlementDetail>;
  settlementApprovalGetAll: IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement>;
  settlementApprovalGetById: IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail>;
  settlementApprovalPost: IQuerySingleState<ISettlementApprovalPostRequest, boolean>;

}