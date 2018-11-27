import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest,
  IPurchaseApprovalPostRequest,
} from '@purchase/classes/queries/purchaseApproval';
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
} from '@purchase/classes/queries/settlementApproval';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';

export interface IPurchaseState {
  purchaseGetAll: IQueryCollectionState<IPurchaseGetAllRequest, IPurchase>;
  purchaseGetById: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
  purchasePost: IQuerySingleState<IPurchasePostRequest, IPurchase>;
  purchasePut: IQuerySingleState<IPurchasePutRequest, IPurchase>;
  purchaseApprovalGetAll: IQueryCollectionState<IPurchaseApprovalGetAllRequest, IPurchase>;
  purchaseApprovalGetById: IQuerySingleState<IPurchaseApprovalGetByIdRequest, IPurchaseDetail>;
  purchaseApprovalPost: IQuerySingleState<IPurchaseApprovalPostRequest, boolean>;
  settlementGetAll: IQueryCollectionState<ISettlementGetAllRequest, ISettlement>;
  settlementGetById: IQuerySingleState<ISettlementGetByIdRequest, ISettlementDetail>;
  settlementPost: IQuerySingleState<ISettlementPostRequest, ISettlement>;
  settlementPut: IQuerySingleState<ISettlementPutRequest, ISettlement>;
  settlementApprovalGetAll: IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement>;
  settlementApprovalGetById: IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail>;
  settlementApprovalPost: IQuerySingleState<ISettlementApprovalPostRequest, boolean>;

}