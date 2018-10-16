import {
  IFinanceBulkPostRequest,
  IFinanceGetAllRequest,
  IFinanceGetByIdRequest,
  IFinancePostRequest,
} from '@finance/classes/queries';
import { IFinance, IFinanceDetail } from '@finance/classes/response';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum FinanceAction {
  GET_ALL_REQUEST = '@@finance/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@finance/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@finance/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@finance/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@finance/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@finance/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@finance/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@finance/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@finance/POST_REQUEST',
  POST_SUCCESS = '@@finance/POST_SUCCESS',
  POST_ERROR = '@@finance/POST_ERROR',
  POST_DISPOSE = '@@finance/POST_DISPOSE',
  BULK_POST_REQUEST = '@@finance/BULK_POST_REQUEST',
  BULK_POST_SUCCESS = '@@finance/BULK_POST_SUCCESS',
  BULK_POST_ERROR = '@@finance/BULK_POST_ERROR',
  BULK_POST_DISPOSE = '@@finance/BULK_POST_DISPOSE',
}

// get all
export const financeGetAllRequest = (request: IFinanceGetAllRequest) => action(FinanceAction.GET_ALL_REQUEST, request);
export const financeGetAllSuccess = (response: IResponseCollection<IFinance>) => action(FinanceAction.GET_ALL_SUCCESS, response);
export const financeGetAllError = (message: string) => action(FinanceAction.GET_ALL_ERROR, message);
export const financeGetAllDispose = () => action(FinanceAction.GET_ALL_DISPOSE);

// get by id
export const financeGetByIdRequest = (request: IFinanceGetByIdRequest) => action(FinanceAction.GET_BY_ID_REQUEST, request);
export const financeGetByIdSuccess = (response: IResponseSingle<IFinanceDetail>) => action(FinanceAction.GET_BY_ID_SUCCESS, response);
export const financeGetByIdError = (message: string) => action(FinanceAction.GET_BY_ID_ERROR, message);
export const financeGetByIdDispose = () => action(FinanceAction.GET_BY_ID_DISPOSE);

// post
export const financePostRequest = (request: IFinancePostRequest) => action(FinanceAction.POST_REQUEST, request);
export const financePostSuccess = (response: IResponseSingle<IFinance>) => action(FinanceAction.POST_SUCCESS, response);
export const financePostError = (message: string) => action(FinanceAction.POST_ERROR, message);
export const financePostDispose = () => action(FinanceAction.POST_DISPOSE);

// bulk post
export const financeBulkPostRequest = (request: IFinanceBulkPostRequest) => action(FinanceAction.BULK_POST_REQUEST, request);
export const financeBulkPostSuccess = (response: IResponseSingle<IFinance>) => action(FinanceAction.BULK_POST_SUCCESS, response);
export const financeBulkPostError = (message: string) => action(FinanceAction.BULK_POST_ERROR, message);
export const financeBulkPostDispose = () => action(FinanceAction.BULK_POST_DISPOSE);