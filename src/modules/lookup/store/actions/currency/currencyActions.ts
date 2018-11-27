import { IResponseCollection, 
  IResponseSingle 
} from '@generic/interfaces';
import { 
  ICurrencyDeleteRequest, 
  ICurrencyGetAllRequest, 
  ICurrencyGetByIdRequest, 
  ICurrencyGetListRequest, 
  ICurrencyPostRequest, 
  ICurrencyPutRequest 
} from '@lookup/classes/queries/currency';
import { ICurrency, ICurrencyList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

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
  POST_REQUEST = '@@currency/POST_REQUEST',
  POST_SUCCESS = '@@currency/POST_SUCCESS',
  POST_ERROR = '@@currency/POST_ERROR',
  POST_DISPOSE = '@@currency/POST_DISPOSE',
  PUT_REQUEST = '@@currency/PUT_REQUEST',
  PUT_SUCCESS = '@@currency/PUT_SUCCESS',
  PUT_ERROR = '@@currency/PUT_ERROR',
  PUT_DISPOSE = '@@currency/DELETE_DISPOSE',
  DELETE_REQUEST = '@@currency/DELETE_REQUEST',
  DELETE_SUCCESS = '@@currency/DELETE_SUCCESS',
  DELETE_ERROR = '@@currency/DELETE_ERROR',
  DELETE_DISPOSE = '@@currency/DELETE_DISPOSE',
}

// get all
export const lookupCurrencyGetAllRequest = (request: ICurrencyGetAllRequest) => action(CurrencyAction.GET_ALL_REQUEST, request);
export const lookupCurrencyGetAllSuccess = (response: IResponseCollection<ICurrency>) => action(CurrencyAction.GET_ALL_SUCCESS, response);
export const lookupCurrencyGetAllError = (message: string) => action(CurrencyAction.GET_ALL_ERROR, message);
export const lookupCurrencyGetAllDispose = () => action(CurrencyAction.GET_ALL_DISPOSE);

// get list
export const lookupCurrencyGetListRequest = (request: ICurrencyGetListRequest) => action(CurrencyAction.GET_LIST_REQUEST, request);
export const lookupCurrencyGetListSuccess = (response: IResponseCollection<ICurrencyList>) => action(CurrencyAction.GET_LIST_SUCCESS, response);
export const lookupCurrencyGetListError = (message: string) => action(CurrencyAction.GET_LIST_ERROR, message);
export const lookupCurrencyGetListDispose = () => action(CurrencyAction.GET_LIST_DISPOSE);

// get by id
export const lookupCurrencyGetByIdRequest = (request: ICurrencyGetByIdRequest) => action(CurrencyAction.GET_BY_ID_REQUEST, request);
export const lookupCurrencyGetByIdSuccess = (response: IResponseCollection<ICurrency>) => action(CurrencyAction.GET_BY_ID_SUCCESS, response);
export const lookupCurrencyGetByIdError = (message: string) => action(CurrencyAction.GET_BY_ID_ERROR, message);
export const lookupCurrencyGetByIdDispose = () => action(CurrencyAction.GET_BY_ID_DISPOSE);

// post
export const lookupCurrencyPostRequest = (request: ICurrencyPostRequest) => action(CurrencyAction.POST_REQUEST, request);
export const lookupCurrencyPostSuccess = (response: IResponseSingle<ICurrency>) => action(CurrencyAction.POST_SUCCESS, response);
export const lookupCurrencyPostError = (message: string) => action(CurrencyAction.POST_ERROR, message);
export const lookupCurrencyPostDispose = () => action(CurrencyAction.POST_DISPOSE);

// put
export const lookupCurrencyPutRequest = (request: ICurrencyPutRequest) => action(CurrencyAction.PUT_REQUEST, request);
export const lookupCurrencyPutSuccess = (response: IResponseSingle<ICurrency>) => action(CurrencyAction.PUT_SUCCESS, response);
export const lookupCurrencyPutError = (message: string) => action(CurrencyAction.PUT_ERROR, message);
export const lookupCurrencyPutDispose = () => action(CurrencyAction.PUT_DISPOSE);

// delete
export const lookupCurrencyDeleteRequest = (request: ICurrencyDeleteRequest) => action(CurrencyAction.DELETE_REQUEST, request);
export const lookupCurrencyDeleteSuccess = (response: boolean) => action(CurrencyAction.DELETE_SUCCESS, response);
export const lookupCurrencyDeleteError = (message: string) => action(CurrencyAction.DELETE_ERROR, message);
export const lookupCurrencyDeleteDispose = () => action(CurrencyAction.DELETE_DISPOSE);