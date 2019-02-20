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
import { ICurrency, ICurrencyDetail, ICurrencyList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupCurrencyAction {
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
export const lookupCurrencyGetAllRequest = (request: ICurrencyGetAllRequest) => action(LookupCurrencyAction.GET_ALL_REQUEST, request);
export const lookupCurrencyGetAllSuccess = (response: IResponseCollection<ICurrency>) => action(LookupCurrencyAction.GET_ALL_SUCCESS, response);
export const lookupCurrencyGetAllError = (error: any) => action(LookupCurrencyAction.GET_ALL_ERROR, error);
export const lookupCurrencyGetAllDispose = () => action(LookupCurrencyAction.GET_ALL_DISPOSE);

// get list
export const lookupCurrencyGetListRequest = (request: ICurrencyGetListRequest) => action(LookupCurrencyAction.GET_LIST_REQUEST, request);
export const lookupCurrencyGetListSuccess = (response: IResponseCollection<ICurrencyList>) => action(LookupCurrencyAction.GET_LIST_SUCCESS, response);
export const lookupCurrencyGetListError = (error: any) => action(LookupCurrencyAction.GET_LIST_ERROR, error);
export const lookupCurrencyGetListDispose = () => action(LookupCurrencyAction.GET_LIST_DISPOSE);

// get by id
export const lookupCurrencyGetByIdRequest = (request: ICurrencyGetByIdRequest) => action(LookupCurrencyAction.GET_BY_ID_REQUEST, request);
export const lookupCurrencyGetByIdSuccess = (response: IResponseCollection<ICurrencyDetail>) => action(LookupCurrencyAction.GET_BY_ID_SUCCESS, response);
export const lookupCurrencyGetByIdError = (error: any) => action(LookupCurrencyAction.GET_BY_ID_ERROR, error);
export const lookupCurrencyGetByIdDispose = () => action(LookupCurrencyAction.GET_BY_ID_DISPOSE);

// post
export const lookupCurrencyPostRequest = (request: ICurrencyPostRequest) => action(LookupCurrencyAction.POST_REQUEST, request);
export const lookupCurrencyPostSuccess = (response: IResponseSingle<ICurrency>) => action(LookupCurrencyAction.POST_SUCCESS, response);
export const lookupCurrencyPostError = (error: any) => action(LookupCurrencyAction.POST_ERROR, error);
export const lookupCurrencyPostDispose = () => action(LookupCurrencyAction.POST_DISPOSE);

// put
export const lookupCurrencyPutRequest = (request: ICurrencyPutRequest) => action(LookupCurrencyAction.PUT_REQUEST, request);
export const lookupCurrencyPutSuccess = (response: IResponseSingle<ICurrency>) => action(LookupCurrencyAction.PUT_SUCCESS, response);
export const lookupCurrencyPutError = (error: any) => action(LookupCurrencyAction.PUT_ERROR, error);
export const lookupCurrencyPutDispose = () => action(LookupCurrencyAction.PUT_DISPOSE);

// delete
export const lookupCurrencyDeleteRequest = (request: ICurrencyDeleteRequest) => action(LookupCurrencyAction.DELETE_REQUEST, request);
export const lookupCurrencyDeleteSuccess = (response: boolean) => action(LookupCurrencyAction.DELETE_SUCCESS, response);
export const lookupCurrencyDeleteError = (error: any) => action(LookupCurrencyAction.DELETE_ERROR, error);
export const lookupCurrencyDeleteDispose = () => action(LookupCurrencyAction.DELETE_DISPOSE);