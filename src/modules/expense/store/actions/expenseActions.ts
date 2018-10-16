import {
  IExpenseApprovalGetAllRequest,
  IExpenseApprovalGetByIdRequest,
  IExpenseApprovalPostRequest,
  IExpenseGetAllRequest,
  IExpenseGetByIdRequest,
  IExpensePostRequest,
  IExpensePutRequest
} from '@expense/classes/queries';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ExpenseAction {
  GET_ALL_REQUEST = '@@expense/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@expense/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@expense/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@expense/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@expense/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@expense/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@expense/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@expense/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@expense/POST_REQUEST',
  POST_SUCCESS = '@@expense/POST_SUCCESS',
  POST_ERROR = '@@expense/POST_ERROR',
  POST_DISPOSE = '@@expense/POST_DISPOSE',
  PUT_REQUEST = '@@expense/PUT_REQUEST',
  PUT_SUCCESS = '@@expense/PUT_SUCCESS',
  PUT_ERROR = '@@expense/PUT_ERROR',
  PUT_DISPOSE = '@@expense/PUT_DISPOSE',
  APPROVAL_GET_ALL_REQUEST = '@@expense/APPROVAL_GET_ALL_REQUEST',
  APPROVAL_GET_ALL_SUCCESS = '@@expense/APPROVAL_GET_ALL_SUCCESS',
  APPROVAL_GET_ALL_ERROR = '@@expense/APPROVAL_GET_ALL_ERROR',
  APPROVAL_GET_ALL_DISPOSE = '@@expense/APPROVAL_GET_ALL_DISPOSE',
  APPROVAL_GET_BY_ID_REQUEST = '@@expense/APPROVAL_GET_BY_ID_REQUEST',
  APPROVAL_GET_BY_ID_SUCCESS = '@@expense/APPROVAL_GET_BY_ID_SUCCESS',
  APPROVAL_GET_BY_ID_ERROR = '@@expense/APPROVAL_GET_BY_ID_ERROR',
  APPROVAL_GET_BY_ID_DISPOSE = '@@expense/APPROVAL_GET_BY_ID_DISPOSE',
  APPROVAL_POST_REQUEST = '@@expense/APPROVAL_POST_REQUEST',
  APPROVAL_POST_SUCCESS = '@@expense/APPROVAL_POST_SUCCESS',
  APPROVAL_POST_ERROR = '@@expense/APPROVAL_POST_ERROR',
  APPROVAL_POST_DISPOSE = '@@expense/APPROVAL_POST_DISPOSE',
}

// get all
export const expenseGetAllRequest = (request: IExpenseGetAllRequest) => action(ExpenseAction.GET_ALL_REQUEST, request);
export const expenseGetAllSuccess = (response: IResponseCollection<IExpense>) => action(ExpenseAction.GET_ALL_SUCCESS, response);
export const expenseGetAllError = (message: string) => action(ExpenseAction.GET_ALL_ERROR, message);
export const expenseGetAllDispose = () => action(ExpenseAction.GET_ALL_DISPOSE);

// get by id
export const expenseGetByIdRequest = (request: IExpenseGetByIdRequest) => action(ExpenseAction.GET_BY_ID_REQUEST, request);
export const expenseGetByIdSuccess = (response: IResponseSingle<IExpenseDetail>) => action(ExpenseAction.GET_BY_ID_SUCCESS, response);
export const expenseGetByIdError = (message: string) => action(ExpenseAction.GET_BY_ID_ERROR, message);
export const expenseGetByIdDispose = () => action(ExpenseAction.GET_BY_ID_DISPOSE);

// post
export const expensePostRequest = (request: IExpensePostRequest) => action(ExpenseAction.POST_REQUEST, request);
export const expensePostSuccess = (response: IResponseSingle<IExpense>) => action(ExpenseAction.POST_SUCCESS, response);
export const expensePostError = (message: string) => action(ExpenseAction.POST_ERROR, message);
export const expensePostDispose = () => action(ExpenseAction.POST_DISPOSE);

// put
export const expensePutRequest = (request: IExpensePutRequest) => action(ExpenseAction.PUT_REQUEST, request);
export const expensePutSuccess = (response: IResponseSingle<IExpense>) => action(ExpenseAction.PUT_SUCCESS, response);
export const expensePutError = (message: string) => action(ExpenseAction.PUT_ERROR, message);
export const expensePutDispose = () => action(ExpenseAction.PUT_DISPOSE);

// get all approval
export const expenseApprovalGetAllRequest = (request: IExpenseApprovalGetAllRequest) => action(ExpenseAction.APPROVAL_GET_ALL_REQUEST, request);
export const expenseApprovalGetAllSuccess = (response: IResponseCollection<IExpense>) => action(ExpenseAction.APPROVAL_GET_ALL_SUCCESS, response);
export const expenseApprovalGetAllError = (message: string) => action(ExpenseAction.APPROVAL_GET_ALL_ERROR, message);
export const expenseApprovalGetAllDispose = () => action(ExpenseAction.APPROVAL_GET_ALL_DISPOSE);

// get by id approval
export const expenseApprovalGetByIdRequest = (request: IExpenseApprovalGetByIdRequest) => action(ExpenseAction.APPROVAL_GET_BY_ID_REQUEST, request);
export const expenseApprovalGetByIdSuccess = (response: IResponseSingle<IExpenseDetail>) => action(ExpenseAction.APPROVAL_GET_BY_ID_SUCCESS, response);
export const expenseApprovalGetByIdError = (message: string) => action(ExpenseAction.APPROVAL_GET_BY_ID_ERROR, message);
export const expenseApprovalGetByIdDispose = () => action(ExpenseAction.APPROVAL_GET_BY_ID_DISPOSE);

// post approval
export const expenseApprovalPostRequest = (request: IExpenseApprovalPostRequest) => action(ExpenseAction.APPROVAL_POST_REQUEST, request);
export const expenseApprovalPostSuccess = (response: IResponseSingle<IExpense>) => action(ExpenseAction.APPROVAL_POST_SUCCESS, response);
export const expenseApprovalPostError = (message: string) => action(ExpenseAction.APPROVAL_POST_ERROR, message);
export const expenseApprovalPostDispose = () => action(ExpenseAction.APPROVAL_POST_DISPOSE);