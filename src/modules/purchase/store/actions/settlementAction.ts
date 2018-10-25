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
  GET_ALL_SETTLEMENT_REQUEST = '@@purchase/settlement/GET_ALL_SETTLEMENT_REQUEST',
  GET_ALL_SETTLEMENT_SUCCESS = '@@purchase/settlement/GET_ALL_SETTLEMENT_SUCCESS',
  GET_ALL_SETTLEMENT_ERROR = '@@purchase/settlement/GET_ALL_SETTLEMENT_ERROR',
  GET_ALL_SETTLEMENT_DISPOSE = '@@purchase/settlement/GET_ALL_SETTLEMENT_DISPOSE',
  GET_BY_ID_SETTLEMENT_REQUEST = '@@purchase/settlement/GET_BY_ID_SETTLEMENT_REQUEST',
  GET_BY_ID_SETTLEMENT_SUCCESS = '@@purchase/settlement/GET_BY_ID_SETTLEMENT_SUCCESS',
  GET_BY_ID_SETTLEMENT_ERROR = '@@purchase/settlement/GET_BY_ID_SETTLEMENT_ERROR',
  GET_BY_ID_SETTLEMENT_DISPOSE = '@@purchase/settlement/GET_BY_ID_SETTLEMENT_DISPOSE',
  POST_SETTLEMENT_REQUEST = '@@purchase/settlement/POST_SETTLEMENT_REQUEST',
  POST_SETTLEMENT_SUCCESS = '@@purchase/settlement/POST_SETTLEMENT_SUCCESS',
  POST_SETTLEMENT_ERROR = '@@purchase/settlement/POST_SETTLEMENT_ERROR',
  POST_SETTLEMENT_DISPOSE = '@@purchase/settlement/POST_SETTLEMENT_DISPOSE',
  PUT_SETTLEMENT_REQUEST = '@@purchase/settlement/PUT_SETTLEMENT_REQUEST',
  PUT_SETTLEMENT_SUCCESS = '@@purchase/settlement/PUT_SETTLEMENT_SUCCESS',
  PUT_SETTLEMENT_ERROR = '@@purchase/settlement/PUT_SETTLEMENT_ERROR',
  PUT_SETTLEMENT_DISPOSE = '@@purchase/settlement/PUT_SETTLEMENT_DISPOSE',
}

// get all
export const settlementGetAllRequest = (request: ISettlementGetAllRequest) => action(SettlementAction.GET_ALL_SETTLEMENT_REQUEST, request);
export const settlementGetAllSuccess = (response: IResponseCollection<ISettlement>) => action(SettlementAction.GET_ALL_SETTLEMENT_SUCCESS, response);
export const settlementGetAllError = (message: string) => action(SettlementAction.GET_ALL_SETTLEMENT_ERROR, message);
export const settlementGetAllDispose = () => action(SettlementAction.GET_ALL_SETTLEMENT_DISPOSE);

// get by id
export const settlementGetByIdRequest = (request: ISettlementGetByIdRequest) => action(SettlementAction.GET_BY_ID_SETTLEMENT_REQUEST, request);
export const settlementGetByIdSuccess = (response: IResponseSingle<ISettlementDetail>) => action(SettlementAction.GET_BY_ID_SETTLEMENT_SUCCESS, response);
export const settlementGetByIdError = (message: string) => action(SettlementAction.GET_BY_ID_SETTLEMENT_ERROR, message);
export const settlementGetByIdDispose = () => action(SettlementAction.GET_BY_ID_SETTLEMENT_DISPOSE);

// post
export const settlementPostRequest = (request: ISettlementPostRequest) => action(SettlementAction.POST_SETTLEMENT_REQUEST, request);
export const settlementPostSuccess = (response: IResponseSingle<ISettlement>) => action(SettlementAction.POST_SETTLEMENT_SUCCESS, response);
export const settlementPostError = (message: string) => action(SettlementAction.POST_SETTLEMENT_ERROR, message);
export const settlementPostDispose = () => action(SettlementAction.POST_SETTLEMENT_DISPOSE);

// put
export const settlementPutRequest = (request: ISettlementPutRequest) => action(SettlementAction.PUT_SETTLEMENT_REQUEST, request);
export const settlementPutSuccess = (response: IResponseSingle<ISettlement>) => action(SettlementAction.PUT_SETTLEMENT_SUCCESS, response);
export const settlementPutError = (message: string) => action(SettlementAction.PUT_SETTLEMENT_ERROR, message);
export const settlementPutDispose = () => action(SettlementAction.PUT_SETTLEMENT_DISPOSE);