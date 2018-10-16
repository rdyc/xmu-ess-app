import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest,
  IPurchaseApprovalPostRequest
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
  POST_REQUEST = '@@purchase/POST_REQUEST',
  POST_SUCCESS = '@@purchase/POST_SUCCESS',
  POST_ERROR = '@@purchase/POST_ERROR',
  POST_DISPOSE = '@@purchase/POST_DISPOSE',
}

// get all
export const purchaseApprovalGetAllRequest = (request: IPurchaseApprovalGetAllRequest) => action(PurchaseApprovalAction.GET_ALL_REQUEST, request);
export const purchaseApprovalGetAllSuccess = (response: IResponseCollection<IPurchase>) => action(PurchaseApprovalAction.GET_ALL_SUCCESS, response);
export const purchaseApprovalGetAllError = (message: string) => action(PurchaseApprovalAction.GET_ALL_ERROR, message);
export const purchaseApprovalGetAllDispose = () => action(PurchaseApprovalAction.GET_ALL_DISPOSE);

// get by id
export const purchaseApprovalGetByIdRequest = (request: IPurchaseApprovalGetByIdRequest) => action(PurchaseApprovalAction.GET_BY_ID_REQUEST, request);
export const purchaseApprovalGetByIdSuccess = (response: IResponseSingle<IPurchaseDetail>) => action(PurchaseApprovalAction.GET_BY_ID_SUCCESS, response);
export const purchaseApprovalGetByIdError = (message: string) => action(PurchaseApprovalAction.GET_BY_ID_ERROR, message);
export const purchaseApprovalGetByIdDispose = () => action(PurchaseApprovalAction.GET_BY_ID_DISPOSE);

// post
export const purchaseApprovalPostRequest = (request: IPurchaseApprovalPostRequest) => action(PurchaseApprovalAction.POST_REQUEST, request);
export const purchaseApprovalPostSuccess = (response: boolean) => action(PurchaseApprovalAction.POST_SUCCESS, response);
export const purchaseApprovalPostError = (message: string) => action(PurchaseApprovalAction.POST_ERROR, message);
export const purchaseApprovalPostDispose = () => action(PurchaseApprovalAction.POST_DISPOSE);