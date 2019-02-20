import {
  IExpenseRequestGetAllRequest,
  IExpenseRequestGetByIdRequest,
  IExpenseRequestPostRequest,
  IExpenseRequestPutRequest
} from '@expense/classes/queries/request';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ExpenseRequestAction {
  GET_ALL_REQUEST = '@@expense/request/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@expense/request/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@expense/request/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@expense/request/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@expense/request/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@expense/request/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@expense/request/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@expense/request/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@expense/request/POST_REQUEST',
  POST_SUCCESS = '@@expense/request/POST_SUCCESS',
  POST_ERROR = '@@expense/request/POST_ERROR',
  POST_DISPOSE = '@@expense/request/POST_DISPOSE',
  PUT_REQUEST = '@@expense/request/PUT_REQUEST',
  PUT_SUCCESS = '@@expense/request/PUT_SUCCESS',
  PUT_ERROR = '@@expense/request/PUT_ERROR',
  PUT_DISPOSE = '@@expense/request/PUT_DISPOSE',
}

// get all
export const expenseRequestGetAllRequest = (request: IExpenseRequestGetAllRequest) => action(ExpenseRequestAction.GET_ALL_REQUEST, request);
export const expenseRequestGetAllSuccess = (response: IResponseCollection<IExpense>) => action(ExpenseRequestAction.GET_ALL_SUCCESS, response);
export const expenseRequestGetAllError = (error: any) => action(ExpenseRequestAction.GET_ALL_ERROR, error);
export const expenseRequestGetAllDispose = () => action(ExpenseRequestAction.GET_ALL_DISPOSE);

// get by id
export const expenseRequestGetByIdRequest = (request: IExpenseRequestGetByIdRequest) => action(ExpenseRequestAction.GET_BY_ID_REQUEST, request);
export const expenseRequestGetByIdSuccess = (response: IResponseSingle<IExpenseDetail>) => action(ExpenseRequestAction.GET_BY_ID_SUCCESS, response);
export const expenseRequestGetByIdError = (error: any) => action(ExpenseRequestAction.GET_BY_ID_ERROR, error);
export const expenseRequestGetByIdDispose = () => action(ExpenseRequestAction.GET_BY_ID_DISPOSE);

// post
export const expenseRequestPostRequest = (request: IExpenseRequestPostRequest) => action(ExpenseRequestAction.POST_REQUEST, request);
export const expenseRequestPostSuccess = (response: IResponseSingle<IExpense>) => action(ExpenseRequestAction.POST_SUCCESS, response);
export const expenseRequestPostError = (error: any) => action(ExpenseRequestAction.POST_ERROR, error);
export const expenseRequestPostDispose = () => action(ExpenseRequestAction.POST_DISPOSE);

// put
export const expenseRequestPutRequest = (request: IExpenseRequestPutRequest) => action(ExpenseRequestAction.PUT_REQUEST, request);
export const expenseRequestPutSuccess = (response: IResponseSingle<IExpense>) => action(ExpenseRequestAction.PUT_SUCCESS, response);
export const expenseRequestPutError = (error: any) => action(ExpenseRequestAction.PUT_ERROR, error);
export const expenseRequestPutDispose = () => action(ExpenseRequestAction.PUT_DISPOSE);