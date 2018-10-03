import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/interfaces/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/interfaces/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum SystemAction {
  GET_ALL_REQUEST = '@@system/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/GET_BY_ID_DISPOSE',
}

// get all
export const systemGetAllRequest = (request: ISystemAllRequest) => action(SystemAction.GET_ALL_REQUEST, request);
export const systemGetAllSuccess = (response: IResponseCollection<ISystem>) => action(SystemAction.GET_ALL_SUCCESS, response);
export const systemGetAllError = (message: string) => action(SystemAction.GET_ALL_ERROR, message);
export const systemGetAllDispose = () => action(SystemAction.GET_ALL_DISPOSE);

// get list
export const systemGetListRequest = (request: ISystemListRequest) => action(SystemAction.GET_LIST_REQUEST, request);
export const systemGetListSuccess = (response: IResponseCollection<ISystemList>) => action(SystemAction.GET_LIST_SUCCESS, response);
export const systemGetListError = (message: string) => action(SystemAction.GET_LIST_ERROR, message);
export const systemGetListDispose = () => action(SystemAction.GET_LIST_DISPOSE);

// get by id
export const systemGetByIdRequest = (request: ISystemByIdRequest) => action(SystemAction.GET_BY_ID_REQUEST, request);
export const systemGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(SystemAction.GET_BY_ID_SUCCESS, response);
export const systemGetByIdError = (message: string) => action(SystemAction.GET_BY_ID_ERROR, message);
export const systemGetByIdDispose = () => action(SystemAction.GET_BY_ID_DISPOSE);