import { IResponseCollection } from '@generic/interfaces';
import { IMenuGetAllRequest, IMenuGetByIdRequest, IMenuListRequest } from '@lookup/classes/queries/menu';
import { IMenu, IMenuDetail, IMenuList } from '@lookup/classes/response/menu';
import { action } from 'typesafe-actions';

export const enum LookupMenuAction {
  GET_ALL_REQUEST = '@@lookup/menu/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/menu/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/menu/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/menu/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/menu/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/menu/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/menu/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/menu/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/menu/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/menu/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/menu/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/menu/GET_BY_ID_DISPOSE',
}

// get all
export const lookupMenuGetAllRequest = (request: IMenuGetAllRequest) => action(LookupMenuAction.GET_ALL_REQUEST, request);
export const lookupMenuGetAllSuccess = (response: IResponseCollection<IMenu>) => action(LookupMenuAction.GET_ALL_SUCCESS, response);
export const lookupMenuGetAllError = (error: any) => action(LookupMenuAction.GET_ALL_ERROR, error);
export const lookupMenuGetAllDispose = () => action(LookupMenuAction.GET_ALL_DISPOSE);

// get list
export const lookupMenuGetListRequest = (request: IMenuListRequest) => action(LookupMenuAction.GET_LIST_REQUEST, request);
export const lookupMenuGetListSuccess = (response: IResponseCollection<IMenuList>) => action(LookupMenuAction.GET_LIST_SUCCESS, response);
export const lookupMenuGetListError = (error: any) => action(LookupMenuAction.GET_LIST_ERROR, error);
export const lookupMenuGetListDispose = () => action(LookupMenuAction.GET_LIST_DISPOSE);

// get by id
export const lookupMenuGetByIdRequest = (request: IMenuGetByIdRequest) => action(LookupMenuAction.GET_BY_ID_REQUEST, request);
export const lookupMenuGetByIdSuccess = (response: IResponseCollection<IMenuDetail>) => action(LookupMenuAction.GET_BY_ID_SUCCESS, response);
export const lookupMenuGetByIdError = (error: any) => action(LookupMenuAction.GET_BY_ID_ERROR, error);
export const lookupMenuGetByIdDispose = () => action(LookupMenuAction.GET_BY_ID_DISPOSE);