import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ISettlementGetAllRequest,
  ISettlementGetByIdRequest,
  ISettlementPostRequest,
  ISettlementPutRequest
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
export const settlementGetAllRequest = (request: ISettlementGetAllRequest) => action(SettlementAction.GET_ALL_REQUEST, request);
export const settlementGetAllSuccess = (response: IResponseCollection<ISettlement>) => action(SettlementAction.GET_ALL_SUCCESS, response);
export const settlementGetAllError = (message: string) => action(SettlementAction.GET_ALL_ERROR, message);
export const settlementGetAllDispose = () => action(SettlementAction.GET_ALL_DISPOSE);

// get by id
export const settlementGetByIdRequest = (request: ISettlementGetByIdRequest) => action(SettlementAction.GET_BY_ID_REQUEST, request);
export const settlementGetByIdSuccess = (response: IResponseSingle<ISettlementDetail>) => action(SettlementAction.GET_BY_ID_SUCCESS, response);
export const settlementGetByIdError = (message: string) => action(SettlementAction.GET_BY_ID_ERROR, message);
export const settlementGetByIdDispose = () => action(SettlementAction.GET_BY_ID_DISPOSE);

// post
export const settlementPostRequest = (request: ISettlementPostRequest) => action(SettlementAction.POST_REQUEST, request);
export const settlementPostSuccess = (response: IResponseSingle<ISettlement>) => action(SettlementAction.POST_SUCCESS, response);
export const settlementPostError = (message: string) => action(SettlementAction.POST_ERROR, message);
export const settlementPostDispose = () => action(SettlementAction.POST_DISPOSE);

// put
export const settlementPutRequest = (request: ISettlementPutRequest) => action(SettlementAction.PUT_REQUEST, request);
export const settlementPutSuccess = (response: IResponseSingle<ISettlement>) => action(SettlementAction.PUT_SUCCESS, response);
export const settlementPutError = (message: string) => action(SettlementAction.PUT_ERROR, message);
export const settlementPutDispose = () => action(SettlementAction.PUT_DISPOSE);