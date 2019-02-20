import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IPurchaseGetAllRequest,
  IPurchaseGetByIdRequest,
  IPurchasePostRequest,
  IPurchasePutRequest
} from '@purchase/classes/queries/purchaseRequest';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { action } from 'typesafe-actions';

export const enum PurchaseAction {
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
  PUT_REQUEST = '@@purchase/PUT_REQUEST',
  PUT_SUCCESS = '@@purchase/PUT_SUCCESS',
  PUT_ERROR = '@@purchase/PUT_ERROR',
  PUT_DISPOSE = '@@purchase/PUT_DISPOSE',
}

// get all
export const purchaseGetAllRequest = (request: IPurchaseGetAllRequest) => action(PurchaseAction.GET_ALL_REQUEST, request);
export const purchaseGetAllSuccess = (response: IResponseCollection<IPurchase>) => action(PurchaseAction.GET_ALL_SUCCESS, response);
export const purchaseGetAllError = (error: any) => action(PurchaseAction.GET_ALL_ERROR, error);
export const purchaseGetAllDispose = () => action(PurchaseAction.GET_ALL_DISPOSE);

// get by id
export const purchaseGetByIdRequest = (request: IPurchaseGetByIdRequest) => action(PurchaseAction.GET_BY_ID_REQUEST, request);
export const purchaseGetByIdSuccess = (response: IResponseSingle<IPurchaseDetail>) => action(PurchaseAction.GET_BY_ID_SUCCESS, response);
export const purchaseGetByIdError = (error: any) => action(PurchaseAction.GET_BY_ID_ERROR, error);
export const purchaseGetByIdDispose = () => action(PurchaseAction.GET_BY_ID_DISPOSE);

// post
export const purchasePostRequest = (request: IPurchasePostRequest) => action(PurchaseAction.POST_REQUEST, request);
export const purchasePostSuccess = (response: IResponseSingle<IPurchase>) => action(PurchaseAction.POST_SUCCESS, response);
export const purchasePostError = (error: any) => action(PurchaseAction.POST_ERROR, error);
export const purchasePostDispose = () => action(PurchaseAction.POST_DISPOSE);

// put
export const purchasePutRequest = (request: IPurchasePutRequest) => action(PurchaseAction.PUT_REQUEST, request);
export const purchasePutSuccess = (response: IResponseSingle<IPurchase>) => action(PurchaseAction.PUT_SUCCESS, response);
export const purchasePutError = (error: any) => action(PurchaseAction.PUT_ERROR, error);
export const purchasePutDispose = () => action(PurchaseAction.PUT_DISPOSE);