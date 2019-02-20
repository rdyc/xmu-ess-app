import {
  IExpenseApprovalGetAllRequest,
  IExpenseApprovalGetByIdRequest,
  IExpenseApprovalPostRequest
} from '@expense/classes/queries/approval';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ExpenseApprovalAction {
  APPROVAL_GET_ALL_REQUEST = '@@expense/approval/APPROVAL_GET_ALL_REQUEST',
  APPROVAL_GET_ALL_SUCCESS = '@@expense/approval/APPROVAL_GET_ALL_SUCCESS',
  APPROVAL_GET_ALL_ERROR = '@@expense/approval/APPROVAL_GET_ALL_ERROR',
  APPROVAL_GET_ALL_DISPOSE = '@@expense/approval/APPROVAL_GET_ALL_DISPOSE',
  APPROVAL_GET_BY_ID_REQUEST = '@@expense/approval/APPROVAL_GET_BY_ID_REQUEST',
  APPROVAL_GET_BY_ID_SUCCESS = '@@expense/approval/APPROVAL_GET_BY_ID_SUCCESS',
  APPROVAL_GET_BY_ID_ERROR = '@@expense/approval/APPROVAL_GET_BY_ID_ERROR',
  APPROVAL_GET_BY_ID_DISPOSE = '@@expense/approval/APPROVAL_GET_BY_ID_DISPOSE',
  APPROVAL_POST_REQUEST = '@@expense/approval/APPROVAL_POST_REQUEST',
  APPROVAL_POST_SUCCESS = '@@expense/approval/APPROVAL_POST_SUCCESS',
  APPROVAL_POST_ERROR = '@@expense/approval/APPROVAL_POST_ERROR',
  APPROVAL_POST_DISPOSE = '@@expense/approval/APPROVAL_POST_DISPOSE',
}

// get all approval
export const expenseApprovalGetAllRequest = (request: IExpenseApprovalGetAllRequest) => action(ExpenseApprovalAction.APPROVAL_GET_ALL_REQUEST, request);
export const expenseApprovalGetAllSuccess = (response: IResponseCollection<IExpense>) => action(ExpenseApprovalAction.APPROVAL_GET_ALL_SUCCESS, response);
export const expenseApprovalGetAllError = (error: any) => action(ExpenseApprovalAction.APPROVAL_GET_ALL_ERROR, error);
export const expenseApprovalGetAllDispose = () => action(ExpenseApprovalAction.APPROVAL_GET_ALL_DISPOSE);

// get by id approval
export const expenseApprovalGetByIdRequest = (request: IExpenseApprovalGetByIdRequest) => action(ExpenseApprovalAction.APPROVAL_GET_BY_ID_REQUEST, request);
export const expenseApprovalGetByIdSuccess = (response: IResponseSingle<IExpenseDetail>) => action(ExpenseApprovalAction.APPROVAL_GET_BY_ID_SUCCESS, response);
export const expenseApprovalGetByIdError = (error: any) => action(ExpenseApprovalAction.APPROVAL_GET_BY_ID_ERROR, error);
export const expenseApprovalGetByIdDispose = () => action(ExpenseApprovalAction.APPROVAL_GET_BY_ID_DISPOSE);

// post approval
export const expenseApprovalPostRequest = (request: IExpenseApprovalPostRequest) => action(ExpenseApprovalAction.APPROVAL_POST_REQUEST, request);
export const expenseApprovalPostSuccess = (response: IResponseSingle<IExpense>) => action(ExpenseApprovalAction.APPROVAL_POST_SUCCESS, response);
export const expenseApprovalPostError = (error: any) => action(ExpenseApprovalAction.APPROVAL_POST_ERROR, error);
export const expenseApprovalPostDispose = () => action(ExpenseApprovalAction.APPROVAL_POST_DISPOSE);