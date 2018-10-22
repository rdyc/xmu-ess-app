import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest,
  IPurchaseApprovalPostRequest
} from '@purchase/classes/queries/purchaseHistories';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { action } from 'typesafe-actions';

export const enum PurchaseApprovalAction {
  GET_ALL_APPROVAL_REQUEST = '@@purchase/approval/GET_ALL_APPROVAL_REQUEST',
  GET_ALL_APPROVAL_SUCCESS = '@@purchase/approval/GET_ALL_APPROVAL_SUCCESS',
  GET_ALL_APPROVAL_ERROR = '@@purchase/approval/GET_ALL_APPROVAL_ERROR',
  GET_ALL_APPROVAL_DISPOSE = '@@purchase/approval/GET_ALL_APPROVAL_DISPOSE',
  GET_BY_ID_APPROVAL_REQUEST = '@@purchase/approval/GET_BY_ID_APPROVAL_REQUEST',
  GET_BY_ID_APPROVAL_SUCCESS = '@@purchase/approval/GET_BY_ID_APPROVAL_SUCCESS',
  GET_BY_ID_APPROVAL_ERROR = '@@purchase/approval/GET_BY_ID_APPROVAL_ERROR',
  GET_BY_ID_APPROVAL_DISPOSE = '@@purchase/approval/GET_BY_ID_APPROVAL_DISPOSE',
  POST_APPROVAL_REQUEST = '@@purchase/approval/POST_APPROVAL_REQUEST',
  POST_APPROVAL_SUCCESS = '@@purchase/approval/POST_APPROVAL_SUCCESS',
  POST_APPROVAL_ERROR = '@@purchase/approval/POST_APPROVAL_ERROR',
  POST_APPROVAL_DISPOSE = '@@purchase/approval/POST_APPROVAL_DISPOSE',
}

// get all
export const purchaseApprovalGetAllRequest = (request: IPurchaseApprovalGetAllRequest) => action(PurchaseApprovalAction.GET_ALL_APPROVAL_REQUEST, request);
export const purchaseApprovalGetAllSuccess = (response: IResponseCollection<IPurchase>) => action(PurchaseApprovalAction.GET_ALL_APPROVAL_SUCCESS, response);
export const purchaseApprovalGetAllError = (message: string) => action(PurchaseApprovalAction.GET_ALL_APPROVAL_ERROR, message);
export const purchaseApprovalGetAllDispose = () => action(PurchaseApprovalAction.GET_ALL_APPROVAL_DISPOSE);

// get by id
export const purchaseApprovalGetByIdRequest = (request: IPurchaseApprovalGetByIdRequest) => action(PurchaseApprovalAction.GET_BY_ID_APPROVAL_REQUEST, request);
export const purchaseApprovalGetByIdSuccess = (response: IResponseSingle<IPurchaseDetail>) => action(PurchaseApprovalAction.GET_BY_ID_APPROVAL_SUCCESS, response);
export const purchaseApprovalGetByIdError = (message: string) => action(PurchaseApprovalAction.GET_BY_ID_APPROVAL_ERROR, message);
export const purchaseApprovalGetByIdDispose = () => action(PurchaseApprovalAction.GET_BY_ID_APPROVAL_DISPOSE);

// post
export const purchaseApprovalPostRequest = (request: IPurchaseApprovalPostRequest) => action(PurchaseApprovalAction.POST_APPROVAL_REQUEST, request);
export const purchaseApprovalPostSuccess = (response: boolean) => action(PurchaseApprovalAction.POST_APPROVAL_SUCCESS, response);
export const purchaseApprovalPostError = (message: string) => action(PurchaseApprovalAction.POST_APPROVAL_ERROR, message);
export const purchaseApprovalPostDispose = () => action(PurchaseApprovalAction.POST_APPROVAL_DISPOSE);