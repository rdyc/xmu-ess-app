import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest,
} from '@purchase/classes/queries/purchaseHistories';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';

export interface IPurchaseApprovalState {
  projectGetAll: IQueryCollectionState<IPurchaseApprovalGetAllRequest, IPurchase>;
  projectGetById: IQuerySingleState<IPurchaseApprovalGetByIdRequest, IPurchaseDetail>;
}