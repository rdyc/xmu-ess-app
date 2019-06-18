import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ISystemLimitAllRequest, ISystemLimitAmountRequest, ISystemLimitByIdRequest, ISystemLimitDeleteRequest, ISystemLimitListRequest, ISystemLimitPostRequest, ISystemLimitPutRequest } from '@lookup/classes/queries';
import { ISystemLimit, ISystemLimitAmount, ISystemLimitDetail, ISystemLimitList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupSystemLimitAction {
  GET_ALL_REQUEST = '@@lookup/systemLimit/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/systemLimit/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/systemLimit/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/systemLimit/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/systemLimit/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/systemLimit/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/systemLimit/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/systemLimit/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/systemLimit/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/systemLimit/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/systemLimit/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/systemLimit/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/systemLimit/POST_REQUEST',
  POST_SUCCESS = '@@lookup/systemLimit/POST_SUCCESS',
  POST_ERROR = '@@lookup/systemLimit/POST_ERROR',
  POST_DISPOSE = '@@lookup/systemLimit/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/systemLimit/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/systemLimit/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/systemLimit/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/systemLimit/PUT_DISPOSE',
  DELETE_REQUEST = '@@lookup/systemLimit/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/systemLimit/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/systemLimit/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/systemLimit/DELETE_DISPOSE',
  GET_AMOUNT_REQUEST = '@@lookup/systemLimit/GET_AMOUNT_REQUEST',
  GET_AMOUNT_SUCCESS = '@@lookup/systemLimit/GET_AMOUNT_SUCCESS',
  GET_AMOUNT_ERROR = '@@lookup/systemLimit/GET_AMOUNT_ERROR',
  GET_AMOUNT_DISPOSE = '@@lookup/systemLimit/GET_AMOUNT_DISPOSE',
}

// get all
export const lookupSystemLimitGetAllRequest = (request: ISystemLimitAllRequest) => action(LookupSystemLimitAction.GET_ALL_REQUEST, request);
export const lookupSystemLimitGetAllSuccess = (response: IResponseCollection<ISystemLimit>) => action(LookupSystemLimitAction.GET_ALL_SUCCESS, response);
export const lookupSystemLimitGetAllError = (error: any) => action(LookupSystemLimitAction.GET_ALL_ERROR, error);
export const lookupSystemLimitGetAllDispose = () => action(LookupSystemLimitAction.GET_ALL_DISPOSE);

// get list
export const lookupSystemLimitGetListRequest = (request: ISystemLimitListRequest) => action(LookupSystemLimitAction.GET_LIST_REQUEST, request);
export const lookupSystemLimitGetListSuccess = (response: IResponseCollection<ISystemLimitList>) => action(LookupSystemLimitAction.GET_LIST_SUCCESS, response);
export const lookupSystemLimitGetListError = (error: any) => action(LookupSystemLimitAction.GET_LIST_ERROR, error);
export const lookupSystemLimitGetListDispose = () => action(LookupSystemLimitAction.GET_LIST_DISPOSE);

// get by id
export const lookupSystemLimitGetByIdRequest = (request: ISystemLimitByIdRequest) => action(LookupSystemLimitAction.GET_BY_ID_REQUEST, request);
export const lookupSystemLimitGetByIdSuccess = (response: IResponseCollection<ISystemLimitDetail>) => action(LookupSystemLimitAction.GET_BY_ID_SUCCESS, response);
export const lookupSystemLimitGetByIdError = (error: any) => action(LookupSystemLimitAction.GET_BY_ID_ERROR, error);
export const lookupSystemLimitGetByIdDispose = () => action(LookupSystemLimitAction.GET_BY_ID_DISPOSE);

// post
export const lookupSystemLimitPostRequest = (request: ISystemLimitPostRequest) => action(LookupSystemLimitAction.POST_REQUEST, request);
export const lookupSystemLimitPostSuccess = (response: IResponseSingle<ISystemLimit>)  => action(LookupSystemLimitAction.POST_SUCCESS, response); 
export const lookupSystemLimitPostError = (error: any) => action(LookupSystemLimitAction.POST_ERROR, error);
export const lookupSystemLimitPostDispose = () => action(LookupSystemLimitAction.POST_DISPOSE);

// put
export const lookupSystemLimitPutRequest = (request: ISystemLimitPutRequest) => action(LookupSystemLimitAction.PUT_REQUEST, request);
export const lookupSystemLimitPutSuccess = (response: IResponseSingle<ISystemLimit>) => action(LookupSystemLimitAction.PUT_SUCCESS, response);
export const lookupSystemLimitPutError = (error: any) => action(LookupSystemLimitAction.POST_ERROR, error);
export const lookupSystemLimitPutDispose = () => action(LookupSystemLimitAction.PUT_DISPOSE);

// delete
export const lookupSystemLimitDeleteRequest = (request: ISystemLimitDeleteRequest) => action(LookupSystemLimitAction.DELETE_REQUEST, request);
export const lookupSystemLimitDeleteSuccess = (response: boolean) => action(LookupSystemLimitAction.DELETE_SUCCESS, response);
export const lookupSystemLimitDeleteError = (error: any) => action(LookupSystemLimitAction.DELETE_ERROR, error);
export const lookupSystemLimitDeleteDispose = () => action(LookupSystemLimitAction.DELETE_DISPOSE);

// get amount
export const lookupSystemLimitGetAmountRequest = (request: ISystemLimitAmountRequest) => action(LookupSystemLimitAction.GET_AMOUNT_REQUEST, request);
export const lookupSystemLimitGetAmountSuccess = (response: IResponseSingle<ISystemLimitAmount>) => action(LookupSystemLimitAction.GET_AMOUNT_SUCCESS, response);
export const lookupSystemLimitGetAmountError = (error: any) => action(LookupSystemLimitAction.GET_AMOUNT_ERROR, error);
export const lookupSystemLimitGetAmountDispose = () => action(LookupSystemLimitAction.GET_AMOUNT_DISPOSE);