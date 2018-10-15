import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ISettlementApprovalGetAllRequest,
  ISettlementApprovalGetByIdRequest
} from '@purchase/classes/queries/settlementHistories';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { action } from 'typesafe-actions';

export const enum SettlementApprovalAction {
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
export const settlementApprovalGetAllRequest = (request: ISettlementApprovalGetAllRequest) => action(SettlementApprovalAction.GET_ALL_REQUEST, request);
export const settlementApprovalGetAllSuccess = (response: IResponseCollection<ISettlement>) => action(SettlementApprovalAction.GET_ALL_SUCCESS, response);
export const settlementApprovalGetAllError = (message: string) => action(SettlementApprovalAction.GET_ALL_ERROR, message);
export const settlementApprovalGetAllDispose = () => action(SettlementApprovalAction.GET_ALL_DISPOSE);

// get by id
export const settlementApprovalGetByIdRequest = (request: ISettlementApprovalGetByIdRequest) => action(SettlementApprovalAction.GET_BY_ID_REQUEST, request);
export const settlementApprovalGetByIdSuccess = (response: IResponseSingle<ISettlementDetail>) => action(SettlementApprovalAction.GET_BY_ID_SUCCESS, response);
export const settlementApprovalGetByIdError = (message: string) => action(SettlementApprovalAction.GET_BY_ID_ERROR, message);
export const settlementApprovalGetByIdDispose = () => action(SettlementApprovalAction.GET_BY_ID_DISPOSE);
