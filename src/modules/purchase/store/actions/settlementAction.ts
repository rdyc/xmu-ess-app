import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ISettlementGetAllRequest,
  ISettlementGetByIdRequest
} from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { action } from 'typesafe-actions';

export const enum SettlementAction {
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
export const purchaseGetAllRequest = (request: ISettlementGetAllRequest) => action(SettlementAction.GET_ALL_REQUEST, request);
export const purchaseGetAllSuccess = (response: IResponseCollection<ISettlement>) => action(SettlementAction.GET_ALL_SUCCESS, response);
export const purchaseGetAllError = (message: string) => action(SettlementAction.GET_ALL_ERROR, message);
export const purchaseGetAllDispose = () => action(SettlementAction.GET_ALL_DISPOSE);

// get by id
export const purchaseGetByIdRequest = (request: ISettlementGetByIdRequest) => action(SettlementAction.GET_BY_ID_REQUEST, request);
export const purchaseGetByIdSuccess = (response: IResponseSingle<ISettlementDetail>) => action(SettlementAction.GET_BY_ID_SUCCESS, response);
export const purchaseGetByIdError = (message: string) => action(SettlementAction.GET_BY_ID_ERROR, message);
export const purchaseGetByIdDispose = () => action(SettlementAction.GET_BY_ID_DISPOSE);
