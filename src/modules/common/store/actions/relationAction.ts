import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum RelationAction {
  GET_ALL_REQUEST = '@@system/relation/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/relation/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/relation/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/relation/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/relation/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/relation/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/relation/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/relation/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/relation/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/relation/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/relation/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/relation/GET_BY_ID_DISPOSE',
}

// get all
export const relationGetAllRequest = (request: ISystemAllRequest) => action(RelationAction.GET_ALL_REQUEST, request);
export const relationGetAllSuccess = (response: IResponseCollection<ISystem>) => action(RelationAction.GET_ALL_SUCCESS, response);
export const relationGetAllError = (message: string) => action(RelationAction.GET_ALL_ERROR, message);
export const relationGetAllDispose = () => action(RelationAction.GET_ALL_DISPOSE);

// get list
export const relationGetListRequest = (request: ISystemListRequest) => action(RelationAction.GET_LIST_REQUEST, request);
export const relationGetListSuccess = (response: IResponseCollection<ISystemList>) => action(RelationAction.GET_LIST_SUCCESS, response);
export const relationGetListError = (message: string) => action(RelationAction.GET_LIST_ERROR, message);
export const relationGetListDispose = () => action(RelationAction.GET_LIST_DISPOSE);

// get by id
export const relationGetByIdRequest = (request: ISystemByIdRequest) => action(RelationAction.GET_BY_ID_REQUEST, request);
export const relationGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(RelationAction.GET_BY_ID_SUCCESS, response);
export const relationGetByIdError = (message: string) => action(RelationAction.GET_BY_ID_ERROR, message);
export const relationGetByIdDispose = () => action(RelationAction.GET_BY_ID_DISPOSE);