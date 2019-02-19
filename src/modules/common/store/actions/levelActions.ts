import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum LevelAction {
  GET_ALL_REQUEST = '@@system/level/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/level/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/level/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/level/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/level/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/level/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/level/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/level/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/level/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/level/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/level/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/level/GET_BY_ID_DISPOSE',
}

// get all
export const levelGetAllRequest = (request: ISystemAllRequest) => action(LevelAction.GET_ALL_REQUEST, request);
export const levelGetAllSuccess = (response: IResponseCollection<ISystem>) => action(LevelAction.GET_ALL_SUCCESS, response);
export const levelGetAllError = (error: any) => action(LevelAction.GET_ALL_ERROR, error);
export const levelGetAllDispose = () => action(LevelAction.GET_ALL_DISPOSE);

// get list
export const levelGetListRequest = (request: ISystemListRequest) => action(LevelAction.GET_LIST_REQUEST, request);
export const levelGetListSuccess = (response: IResponseCollection<ISystemList>) => action(LevelAction.GET_LIST_SUCCESS, response);
export const levelGetListError = (error: any) => action(LevelAction.GET_LIST_ERROR, error);
export const levelGetListDispose = () => action(LevelAction.GET_LIST_DISPOSE);

// get by id
export const levelGetByIdRequest = (request: ISystemByIdRequest) => action(LevelAction.GET_BY_ID_REQUEST, request);
export const levelGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(LevelAction.GET_BY_ID_SUCCESS, response);
export const levelGetByIdError = (error: any) => action(LevelAction.GET_BY_ID_ERROR, error);
export const levelGetByIdDispose = () => action(LevelAction.GET_BY_ID_DISPOSE);