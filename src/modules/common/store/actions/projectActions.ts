import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ProjectAction {
  GET_ALL_REQUEST = '@@system/project/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/project/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/project/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/project/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/project/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/project/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/project/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/project/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/project/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/project/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/project/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/project/GET_BY_ID_DISPOSE',
}

// get all
export const projectGetAllRequest = (request: ISystemAllRequest) => action(ProjectAction.GET_ALL_REQUEST, request);
export const projectGetAllSuccess = (response: IResponseCollection<ISystem>) => action(ProjectAction.GET_ALL_SUCCESS, response);
export const projectGetAllError = (message: string) => action(ProjectAction.GET_ALL_ERROR, message);
export const projectGetAllDispose = () => action(ProjectAction.GET_ALL_DISPOSE);

// get list
export const projectGetListRequest = (request: ISystemListRequest) => action(ProjectAction.GET_LIST_REQUEST, request);
export const projectGetListSuccess = (response: IResponseCollection<ISystemList>) => action(ProjectAction.GET_LIST_SUCCESS, response);
export const projectGetListError = (message: string) => action(ProjectAction.GET_LIST_ERROR, message);
export const projectGetListDispose = () => action(ProjectAction.GET_LIST_DISPOSE);

// get by id
export const projectGetByIdRequest = (request: ISystemByIdRequest) => action(ProjectAction.GET_BY_ID_REQUEST, request);
export const projectGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(ProjectAction.GET_BY_ID_SUCCESS, response);
export const projectGetByIdError = (message: string) => action(ProjectAction.GET_BY_ID_ERROR, message);
export const projectGetByIdDispose = () => action(ProjectAction.GET_BY_ID_DISPOSE);