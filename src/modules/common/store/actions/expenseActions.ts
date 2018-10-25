import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ExpenseAction {
  GET_ALL_REQUEST = '@@system/expense/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/expense/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/expense/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/expense/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/expense/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/expense/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/expense/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/expense/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/expense/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/expense/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/expense/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/expense/GET_BY_ID_DISPOSE',
}

// get all
export const expenseGetAllRequest = (request: ISystemAllRequest) => action(ExpenseAction.GET_ALL_REQUEST, request);
export const expenseGetAllSuccess = (response: IResponseCollection<ISystem>) => action(ExpenseAction.GET_ALL_SUCCESS, response);
export const expenseGetAllError = (message: string) => action(ExpenseAction.GET_ALL_ERROR, message);
export const expenseGetAllDispose = () => action(ExpenseAction.GET_ALL_DISPOSE);

// get list
export const expenseGetListRequest = (request: ISystemListRequest) => action(ExpenseAction.GET_LIST_REQUEST, request);
export const expenseGetListSuccess = (response: IResponseCollection<ISystemList>) => action(ExpenseAction.GET_LIST_SUCCESS, response);
export const expenseGetListError = (message: string) => action(ExpenseAction.GET_LIST_ERROR, message);
export const expenseGetListDispose = () => action(ExpenseAction.GET_LIST_DISPOSE);

// get by id
export const expenseGetByIdRequest = (request: ISystemByIdRequest) => action(ExpenseAction.GET_BY_ID_REQUEST, request);
export const expenseGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(ExpenseAction.GET_BY_ID_SUCCESS, response);
export const expenseGetByIdError = (message: string) => action(ExpenseAction.GET_BY_ID_ERROR, message);
export const expenseGetByIdDispose = () => action(ExpenseAction.GET_BY_ID_DISPOSE);