import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ISettlementApprovalGetAllRequest,
  ISettlementApprovalGetByIdRequest,
  ISettlementApprovalPostRequest
} from '@purchase/classes/queries/settlementApproval';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { action } from 'typesafe-actions';

export const enum SettlementApprovalAction {
  GET_ALL_S_APPROVAL_REQUEST = '@@purchase/settlementapproval/GET_ALL_S_APPROVAL_REQUEST',
  GET_ALL_S_APPROVAL_SUCCESS = '@@purchase/settlementapproval/GET_ALL_S_APPROVAL_SUCCESS',
  GET_ALL_S_APPROVAL_ERROR = '@@purchase/settlementapproval/GET_ALL_S_APPROVAL_ERROR',
  GET_ALL_S_APPROVAL_DISPOSE = '@@purchase/settlementapproval/GET_ALL_S_APPROVAL_DISPOSE',
  GET_BY_ID_S_APPROVAL_REQUEST = '@@purchase/settlementapproval/GET_BY_ID_S_APPROVAL_REQUEST',
  GET_BY_ID_S_APPROVAL_SUCCESS = '@@purchase/settlementapproval/GET_BY_ID_S_APPROVAL_SUCCESS',
  GET_BY_ID_S_APPROVAL_ERROR = '@@purchase/settlementapproval/GET_BY_ID_S_APPROVAL_ERROR',
  GET_BY_ID_S_APPROVAL_DISPOSE = '@@purchase/settlementapproval/GET_BY_ID_S_APPROVAL_DISPOSE',
  POST_S_APPROVAL_REQUEST = '@@purchase/settlementapproval/POST_S_APPROVAL_REQUEST',
  POST_S_APPROVAL_SUCCESS = '@@purchase/settlementapproval/POST_S_APPROVAL_SUCCESS',
  POST_S_APPROVAL_ERROR = '@@purchase/settlementapproval/POST_S_APPROVAL_ERROR',
  POST_S_APPROVAL_DISPOSE = '@@purchase/settlementapproval/POST_S_APPROVAL_DISPOSE',
}

// get all
export const settlementApprovalGetAllRequest = (request: ISettlementApprovalGetAllRequest) => action(SettlementApprovalAction.GET_ALL_S_APPROVAL_REQUEST, request);
export const settlementApprovalGetAllSuccess = (response: IResponseCollection<ISettlement>) => action(SettlementApprovalAction.GET_ALL_S_APPROVAL_SUCCESS, response);
export const settlementApprovalGetAllError = (message: string) => action(SettlementApprovalAction.GET_ALL_S_APPROVAL_ERROR, message);
export const settlementApprovalGetAllDispose = () => action(SettlementApprovalAction.GET_ALL_S_APPROVAL_DISPOSE);

// get by id
export const settlementApprovalGetByIdRequest = (request: ISettlementApprovalGetByIdRequest) => action(SettlementApprovalAction.GET_BY_ID_S_APPROVAL_REQUEST, request);
export const settlementApprovalGetByIdSuccess = (response: IResponseSingle<ISettlementDetail>) => action(SettlementApprovalAction.GET_BY_ID_S_APPROVAL_SUCCESS, response);
export const settlementApprovalGetByIdError = (message: string) => action(SettlementApprovalAction.GET_BY_ID_S_APPROVAL_ERROR, message);
export const settlementApprovalGetByIdDispose = () => action(SettlementApprovalAction.GET_BY_ID_S_APPROVAL_DISPOSE);

// post
export const settlementApprovalPostRequest = (request: ISettlementApprovalPostRequest) => action(SettlementApprovalAction.POST_S_APPROVAL_REQUEST, request);
export const settlementApprovalPostSuccess = (response: boolean) => action(SettlementApprovalAction.POST_S_APPROVAL_SUCCESS, response);
export const settlementApprovalPostError = (message: string) => action(SettlementApprovalAction.POST_S_APPROVAL_ERROR, message);
export const settlementApprovalPostDispose = () => action(SettlementApprovalAction.POST_S_APPROVAL_DISPOSE);