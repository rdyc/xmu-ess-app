import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest
} from '@purchase/classes/queries/purchaseHistories';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { action } from 'typesafe-actions';

export const enum PurchaseApprovalAction {
  GET_ALL_REQUEST = '@@purchase/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@purchase/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@purchase/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@purchase/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@purchase/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@purchase/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@purchase/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@purchase/GET_BY_ID_DISPOSE',
  // POST_REQUEST = '@@purchase/POST_REQUEST',
  // POST_SUCCESS = '@@purchase/POST_SUCCESS',
  // POST_ERROR = '@@purchase/POST_ERROR',
  // POST_DISPOSE = '@@purchase/POST_DISPOSE',
  // PUT_REQUEST = '@@purchase/PUT_REQUEST',
  // PUT_SUCCESS = '@@purchase/PUT_SUCCESS',
  // PUT_ERROR = '@@purchase/PUT_ERROR',
  // PUT_DISPOSE = '@@purchase/PUT_DISPOSE',
}

// get all
export const purchaseGetAllRequest = (request: IPurchaseApprovalGetAllRequest) => action(PurchaseApprovalAction.GET_ALL_REQUEST, request);
export const purchaseGetAllSuccess = (response: IResponseCollection<IPurchaseApproval>) => action(PurchaseApprovalAction.GET_ALL_SUCCESS, response);
export const purchaseGetAllError = (message: string) => action(PurchaseApprovalAction.GET_ALL_ERROR, message);
export const purchaseGetAllDispose = () => action(PurchaseApprovalAction.GET_ALL_DISPOSE);

// get by id
export const purchaseGetByIdRequest = (request: IPurchaseApprovalGetByIdRequest) => action(PurchaseApprovalAction.GET_BY_ID_REQUEST, request);
export const purchaseGetByIdSuccess = (response: IResponseSingle<IPurchaseApprovalDetail>) => action(PurchaseApprovalAction.GET_BY_ID_SUCCESS, response);
export const purchaseGetByIdError = (message: string) => action(PurchaseApprovalAction.GET_BY_ID_ERROR, message);
export const purchaseGetByIdDispose = () => action(PurchaseApprovalAction.GET_BY_ID_DISPOSE);
