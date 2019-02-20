import {
  IFinanceApprovalBulkPostRequest,
  IFinanceApprovalGetAllRequest,
  IFinanceApprovalGetByIdRequest,
  IFinanceApprovalPostRequest,
} from '@finance/classes/queries/approval';
import { IFinance, IFinanceDetail } from '@finance/classes/response';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum FinanceApprovalAction {
  APPROVAL_GET_ALL_REQUEST = '@@finance/approval/GET_ALL_REQUEST',
  APPROVAL_GET_ALL_SUCCESS = '@@finance/approval/GET_ALL_SUCCESS',
  APPROVAL_GET_ALL_ERROR = '@@finance/approval/GET_ALL_ERROR',
  APPROVAL_GET_ALL_DISPOSE = '@@finance/approval/GET_ALL_DISPOSE',
  APPROVAL_GET_BY_ID_REQUEST = '@@finance/approval/GET_BY_ID_REQUEST',
  APPROVAL_GET_BY_ID_SUCCESS = '@@finance/approval/GET_BY_ID_SUCCESS',
  APPROVAL_GET_BY_ID_ERROR = '@@finance/approval/GET_BY_ID_ERROR',
  APPROVAL_GET_BY_ID_DISPOSE = '@@finance/approval/GET_BY_ID_DISPOSE',
  APPROVAL_POST_REQUEST = '@@finance/approval/POST_REQUEST',
  APPROVAL_POST_SUCCESS = '@@finance/approval/POST_SUCCESS',
  APPROVAL_POST_ERROR = '@@finance/approval/POST_ERROR',
  APPROVAL_POST_DISPOSE = '@@finance/approval/POST_DISPOSE',
  APPROVAL_BULK_POST_REQUEST = '@@finance/approval/BULK_POST_REQUEST',
  APPROVAL_BULK_POST_SUCCESS = '@@finance/approval/BULK_POST_SUCCESS',
  APPROVAL_BULK_POST_ERROR = '@@finance/approval/BULK_POST_ERROR',
  APPROVAL_BULK_POST_DISPOSE = '@@finance/approval/BULK_POST_DISPOSE',
}

// get all
export const financeApprovalGetAllRequest = (request: IFinanceApprovalGetAllRequest) => action(FinanceApprovalAction.APPROVAL_GET_ALL_REQUEST, request);
export const financeApprovalGetAllSuccess = (response: IResponseCollection<IFinance>) => action(FinanceApprovalAction.APPROVAL_GET_ALL_SUCCESS, response);
export const financeApprovalGetAllError = (error: any) => action(FinanceApprovalAction.APPROVAL_GET_ALL_ERROR, error);
export const financeApprovalGetAllDispose = () => action(FinanceApprovalAction.APPROVAL_GET_ALL_DISPOSE);

// get by id
export const financeApprovalGetByIdRequest = (request: IFinanceApprovalGetByIdRequest) => action(FinanceApprovalAction.APPROVAL_GET_BY_ID_REQUEST, request);
export const financeApprovalGetByIdSuccess = (response: IResponseSingle<IFinanceDetail>) => action(FinanceApprovalAction.APPROVAL_GET_BY_ID_SUCCESS, response);
export const financeApprovalGetByIdError = (error: any) => action(FinanceApprovalAction.APPROVAL_GET_BY_ID_ERROR, error);
export const financeApprovalGetByIdDispose = () => action(FinanceApprovalAction.APPROVAL_GET_BY_ID_DISPOSE);

// post
export const financeApprovalPostRequest = (request: IFinanceApprovalPostRequest) => action(FinanceApprovalAction.APPROVAL_POST_REQUEST, request);
export const financeApprovalPostSuccess = (response: IResponseSingle<IFinance>) => action(FinanceApprovalAction.APPROVAL_POST_SUCCESS, response);
export const financeApprovalPostError = (error: any) => action(FinanceApprovalAction.APPROVAL_POST_ERROR, error);
export const financeApprovalPostDispose = () => action(FinanceApprovalAction.APPROVAL_POST_DISPOSE);

// bulk post
export const financeApprovalBulkPostRequest = (request: IFinanceApprovalBulkPostRequest) => action(FinanceApprovalAction.APPROVAL_BULK_POST_REQUEST, request);
export const financeApprovalBulkPostSuccess = (response: IResponseSingle<IFinance>) => action(FinanceApprovalAction.APPROVAL_BULK_POST_SUCCESS, response);
export const financeApprovalBulkPostError = (error: any) => action(FinanceApprovalAction.APPROVAL_BULK_POST_ERROR, error);
export const financeApprovalBulkPostDispose = () => action(FinanceApprovalAction.APPROVAL_BULK_POST_DISPOSE);