import { IResponseCollection } from '@generic/interfaces';
import { IMenuGetAllRequest, IMenuGetByIdRequest, IMenuListRequest } from '@lookup/classes/queries';
import { IMenu, IMenuDetail, IMenuList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum MenuAction {
  GET_ALL_REQUEST = '@@menu/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@menu/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@menu/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@menu/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@menu/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@menu/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@menu/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@menu/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@menu/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@menu/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@menu/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@menu/GET_BY_ID_DISPOSE',
}

// get all
export const menuGetAllRequest = (request: IMenuGetAllRequest) => action(MenuAction.GET_ALL_REQUEST, request);
export const menuGetAllSuccess = (response: IResponseCollection<IMenu>) => action(MenuAction.GET_ALL_SUCCESS, response);
export const menuGetAllError = (message: string) => action(MenuAction.GET_ALL_ERROR, message);
export const menuGetAllDispose = () => action(MenuAction.GET_ALL_DISPOSE);

// get list
export const menuGetListRequest = (request: IMenuListRequest) => action(MenuAction.GET_LIST_REQUEST, request);
export const menuGetListSuccess = (response: IResponseCollection<IMenuList>) => action(MenuAction.GET_LIST_SUCCESS, response);
export const menuGetListError = (message: string) => action(MenuAction.GET_LIST_ERROR, message);
export const menuGetListDispose = () => action(MenuAction.GET_LIST_DISPOSE);

// get by id
export const menuGetByIdRequest = (request: IMenuGetByIdRequest) => action(MenuAction.GET_BY_ID_REQUEST, request);
export const menuGetByIdSuccess = (response: IResponseCollection<IMenuDetail>) => action(MenuAction.GET_BY_ID_SUCCESS, response);
export const menuGetByIdError = (message: string) => action(MenuAction.GET_BY_ID_ERROR, message);
export const menuGetByIdDispose = () => action(MenuAction.GET_BY_ID_DISPOSE);