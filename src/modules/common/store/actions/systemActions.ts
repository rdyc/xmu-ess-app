import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList, ISystemType } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum SystemAction {
  GET_ALL_REQUEST = '@@system/system/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/system/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/system/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/system/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/system/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/system/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/system/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/system/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/system/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/system/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/system/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/system/GET_BY_ID_DISPOSE',
  GET_TYPE_REQUEST = '@@system/system/GET_TYPE_REQUEST',
  GET_TYPE_SUCCESS = '@@system/system/GET_TYPE_SUCCESS',
  GET_TYPE_ERROR = '@@system/system/GET_TYPE_ERROR',
  GET_TYPE_DISPOSE = '@@system/system/GET_TYPE_DISPOSE',
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

// get type
export const systemGetTypeRequest = () => action(SystemAction.GET_TYPE_REQUEST);
export const systemGetTypeSuccess = (response: IResponseCollection<ISystemType>) => action(SystemAction.GET_TYPE_SUCCESS, response);
export const systemGetTypeError = (message: string) => action(SystemAction.GET_TYPE_ERROR, message);
export const systemGetTypeDispose = () => action(SystemAction.GET_TYPE_DISPOSE);