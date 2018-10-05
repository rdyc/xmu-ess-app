import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';
import { ICurrencyAllRequest, ICurrencyByIdRequest, ICurrencyListRequest } from '@lookup/classes/queries';
import { ICurrency, ICurrencyList } from '@lookup/classes/response';

export const enum CurrencyAction {
  GET_ALL_REQUEST = '@@currency/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@currency/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@currency/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@currency/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@currency/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@currency/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@currency/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@currency/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@currency/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@currency/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@currency/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@currency/GET_BY_ID_DISPOSE',
}

// get all
export const currencyGetAllRequest = (request: ICurrencyAllRequest) => action(CurrencyAction.GET_ALL_REQUEST, request);
export const currencyGetAllSuccess = (response: IResponseCollection<ICurrency>) => action(CurrencyAction.GET_ALL_SUCCESS, response);
export const currencyGetAllError = (message: string) => action(CurrencyAction.GET_ALL_ERROR, message);
export const currencyGetAllDispose = () => action(CurrencyAction.GET_ALL_DISPOSE);

// get list
export const currencyGetListRequest = (request: ICurrencyListRequest) => action(CurrencyAction.GET_LIST_REQUEST, request);
export const currencyGetListSuccess = (response: IResponseCollection<ICurrencyList>) => action(CurrencyAction.GET_LIST_SUCCESS, response);
export const currencyGetListError = (message: string) => action(CurrencyAction.GET_LIST_ERROR, message);
export const currencyGetListDispose = () => action(CurrencyAction.GET_LIST_DISPOSE);

// get by id
export const currencyGetByIdRequest = (request: ICurrencyByIdRequest) => action(CurrencyAction.GET_BY_ID_REQUEST, request);
export const currencyGetByIdSuccess = (response: IResponseCollection<ICurrency>) => action(CurrencyAction.GET_BY_ID_SUCCESS, response);
export const currencyGetByIdError = (message: string) => action(CurrencyAction.GET_BY_ID_ERROR, message);
export const currencyGetByIdDispose = () => action(CurrencyAction.GET_BY_ID_DISPOSE);