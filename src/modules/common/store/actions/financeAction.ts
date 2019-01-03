import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum FinanceAction {
  GET_ALL_REQUEST = '@@system/finance/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/finance/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/finance/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/finance/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/finance/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/finance/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/finance/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/finance/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/finance/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/finance/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/finance/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/finance/GET_BY_ID_DISPOSE',
}

// get all
export const financeGetAllRequest = (request: ISystemAllRequest) => action(FinanceAction.GET_ALL_REQUEST, request);
export const financeGetAllSuccess = (response: IResponseCollection<ISystem>) => action(FinanceAction.GET_ALL_SUCCESS, response);
export const financeGetAllError = (message: string) => action(FinanceAction.GET_ALL_ERROR, message);
export const financeGetAllDispose = () => action(FinanceAction.GET_ALL_DISPOSE);

// get list
export const financeGetListRequest = (request: ISystemListRequest) => action(FinanceAction.GET_LIST_REQUEST, request);
export const financeGetListSuccess = (response: IResponseCollection<ISystemList>) => action(FinanceAction.GET_LIST_SUCCESS, response);
export const financeGetListError = (message: string) => action(FinanceAction.GET_LIST_ERROR, message);
export const financeGetListDispose = () => action(FinanceAction.GET_LIST_DISPOSE);

// get by id
export const financeGetByIdRequest = (request: ISystemByIdRequest) => action(FinanceAction.GET_BY_ID_REQUEST, request);
export const financeGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(FinanceAction.GET_BY_ID_SUCCESS, response);
export const financeGetByIdError = (message: string) => action(FinanceAction.GET_BY_ID_ERROR, message);
export const financeGetByIdDispose = () => action(FinanceAction.GET_BY_ID_DISPOSE);