import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IPurchaseGetAllRequest,
  IPurchaseGetByIdRequest,
} from '@purchase/classes/queries/purchaseRequest';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';

export interface IPurchaseState {
  settlementGetAll: IQueryCollectionState<IPurchaseGetAllRequest, IPurchase>;
  settlementGetById: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
}