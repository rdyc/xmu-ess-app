import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum StatusAction {
  GET_ALL_REQUEST = '@@system/status/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/status/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/status/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/status/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/status/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/status/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/status/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/status/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/status/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/status/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/status/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/status/GET_BY_ID_DISPOSE',
}

// get all
export const statusGetAllRequest = (request: ISystemAllRequest) => action(StatusAction.GET_ALL_REQUEST, request);
export const statusGetAllSuccess = (response: IResponseCollection<ISystem>) => action(StatusAction.GET_ALL_SUCCESS, response);
export const statusGetAllError = (message: string) => action(StatusAction.GET_ALL_ERROR, message);
export const statusGetAllDispose = () => action(StatusAction.GET_ALL_DISPOSE);

// get list
export const statusGetListRequest = (request: ISystemListRequest) => action(StatusAction.GET_LIST_REQUEST, request);
export const statusGetListSuccess = (response: IResponseCollection<ISystemList>) => action(StatusAction.GET_LIST_SUCCESS, response);
export const statusGetListError = (message: string) => action(StatusAction.GET_LIST_ERROR, message);
export const statusGetListDispose = () => action(StatusAction.GET_LIST_DISPOSE);

// get by id
export const statusGetByIdRequest = (request: ISystemByIdRequest) => action(StatusAction.GET_BY_ID_REQUEST, request);
export const statusGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(StatusAction.GET_BY_ID_SUCCESS, response);
export const statusGetByIdError = (message: string) => action(StatusAction.GET_BY_ID_ERROR, message);
export const statusGetByIdDispose = () => action(StatusAction.GET_BY_ID_DISPOSE);