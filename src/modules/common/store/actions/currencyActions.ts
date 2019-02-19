import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum CurrencyAction {
  GET_ALL_REQUEST = '@@system/currency/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/currency/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/currency/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/currency/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/currency/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/currency/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/currency/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/currency/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/currency/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/currency/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/currency/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/currency/GET_BY_ID_DISPOSE',
}

// get all
export const currencyGetAllRequest = (request: ISystemAllRequest) => action(CurrencyAction.GET_ALL_REQUEST, request);
export const currencyGetAllSuccess = (response: IResponseCollection<ISystem>) => action(CurrencyAction.GET_ALL_SUCCESS, response);
export const currencyGetAllError = (error: any) => action(CurrencyAction.GET_ALL_ERROR, error);
export const currencyGetAllDispose = () => action(CurrencyAction.GET_ALL_DISPOSE);

// get list
export const currencyGetListRequest = (request: ISystemListRequest) => action(CurrencyAction.GET_LIST_REQUEST, request);
export const currencyGetListSuccess = (response: IResponseCollection<ISystemList>) => action(CurrencyAction.GET_LIST_SUCCESS, response);
export const currencyGetListError = (error: any) => action(CurrencyAction.GET_LIST_ERROR, error);
export const currencyGetListDispose = () => action(CurrencyAction.GET_LIST_DISPOSE);

// get by id
export const currencyGetByIdRequest = (request: ISystemByIdRequest) => action(CurrencyAction.GET_BY_ID_REQUEST, request);
export const currencyGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(CurrencyAction.GET_BY_ID_SUCCESS, response);
export const currencyGetByIdError = (error: any) => action(CurrencyAction.GET_BY_ID_ERROR, error);
export const currencyGetByIdDispose = () => action(CurrencyAction.GET_BY_ID_DISPOSE);