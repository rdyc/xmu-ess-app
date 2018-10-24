import { IResponseCollection } from '@generic/interfaces';
import { ISystemLimitAllRequest, ISystemLimitByIdRequest, ISystemLimitListRequest } from '@lookup/classes/queries';
import { ISystemLimit, ISystemLimitDetail, ISystemLimitList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum SystemLimitAction {
  GET_ALL_REQUEST = '@@systemLimit/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@systemLimit/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@systemLimit/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@systemLimit/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@systemLimit/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@systemLimit/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@systemLimit/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@systemLimit/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@systemLimit/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@systemLimit/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@systemLimit/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@systemLimit/GET_BY_ID_DISPOSE',
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