import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ISystemLimitAllRequest, ISystemLimitByIdRequest, ISystemLimitDeleteRequest, ISystemLimitListRequest, ISystemLimitPostRequest, ISystemLimitPutRequest } from '@lookup/classes/queries';
import { ISystemLimit, ISystemLimitDetail, ISystemLimitList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum SystemLimitAction {
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
  DELETE_DISPOSE = '@@lookup/systemLimit/DELETE_DISPOSE'
}

// get all
export const systemLimitGetAllRequest = (request: ISystemLimitAllRequest) => action(SystemLimitAction.GET_ALL_REQUEST, request);
export const systemLimitGetAllSuccess = (response: IResponseCollection<ISystemLimit>) => action(SystemLimitAction.GET_ALL_SUCCESS, response);
export const systemLimitGetAllError = (message: string) => action(SystemLimitAction.GET_ALL_ERROR, message);
export const systemLimitGetAllDispose = () => action(SystemLimitAction.GET_ALL_DISPOSE);

// get list
export const systemLimitGetListRequest = (request: ISystemLimitListRequest) => action(SystemLimitAction.GET_LIST_REQUEST, request);
export const systemLimitGetListSuccess = (response: IResponseCollection<ISystemLimitList>) => action(SystemLimitAction.GET_LIST_SUCCESS, response);
export const systemLimitGetListError = (message: string) => action(SystemLimitAction.GET_LIST_ERROR, message);
export const systemLimitGetListDispose = () => action(SystemLimitAction.GET_LIST_DISPOSE);

// get by id
export const systemLimitGetByIdRequest = (request: ISystemLimitByIdRequest) => action(SystemLimitAction.GET_BY_ID_REQUEST, request);
export const systemLimitGetByIdSuccess = (response: IResponseCollection<ISystemLimitDetail>) => action(SystemLimitAction.GET_BY_ID_SUCCESS, response);
export const systemLimitGetByIdError = (message: string) => action(SystemLimitAction.GET_BY_ID_ERROR, message);
export const systemLimitGetByIdDispose = () => action(SystemLimitAction.GET_BY_ID_DISPOSE);

// post
export const systemLimitPostRequest = (request: ISystemLimitPostRequest) => action(SystemLimitAction.POST_REQUEST, request);
export const systemLimitPostSuccess = (response: IResponseSingle<ISystemLimit>)  => action(SystemLimitAction.POST_SUCCESS, response); 
export const systemLimitPostError = (message: string) => action(SystemLimitAction.POST_ERROR, message);
export const systemLimitPostDispose = () => action(SystemLimitAction.POST_DISPOSE);

// put
export const systemLimitPutRequest = (request: ISystemLimitPutRequest) => action(SystemLimitAction.PUT_REQUEST, request);
export const systemLimitPutSuccess = (response: IResponseSingle<ISystemLimit>) => action(SystemLimitAction.PUT_SUCCESS, response);
export const systemLimitPutError = (message: string) => action(SystemLimitAction.POST_ERROR, message);
export const systemLimitPutDispose = () => action(SystemLimitAction.PUT_DISPOSE);

// delete
export const systemLimitDeleteRequest = (request: ISystemLimitDeleteRequest) => action(SystemLimitAction.DELETE_REQUEST, request);
export const systemLimitDeleteSuccess = (response: IResponseSingle<ISystemLimit>) => action(SystemLimitAction.DELETE_SUCCESS, response);
export const systemLimitDeleteError = (message: string) => action(SystemLimitAction.DELETE_ERROR, message);
export const systemLimitDeleteDispose = () => action(SystemLimitAction.DELETE_DISPOSE);