import { IResponseCollection } from '@generic/interfaces';
import { IRoleAllRequest, IRoleByIdRequest, IRoleListRequest } from '@lookup/classes/queries';
import { IRole, IRoleDetail, IRoleList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum RoleAction {
  GET_ALL_REQUEST = '@@role/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@role/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@role/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@role/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@role/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@role/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@role/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@role/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@role/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@role/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@role/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@role/GET_BY_ID_DISPOSE',
}

// get all
export const roleGetAllRequest = (request: IRoleAllRequest) => action(RoleAction.GET_ALL_REQUEST, request);
export const roleGetAllSuccess = (response: IResponseCollection<IRole>) => action(RoleAction.GET_ALL_SUCCESS, response);
export const roleGetAllError = (message: string) => action(RoleAction.GET_ALL_ERROR, message);
export const roleGetAllDispose = () => action(RoleAction.GET_ALL_DISPOSE);

// get list
export const roleGetListRequest = (request: IRoleListRequest) => action(RoleAction.GET_LIST_REQUEST, request);
export const roleGetListSuccess = (response: IResponseCollection<IRoleList>) => action(RoleAction.GET_LIST_SUCCESS, response);
export const roleGetListError = (message: string) => action(RoleAction.GET_LIST_ERROR, message);
export const roleGetListDispose = () => action(RoleAction.GET_LIST_DISPOSE);

// get by id
export const roleGetByIdRequest = (request: IRoleByIdRequest) => action(RoleAction.GET_BY_ID_REQUEST, request);
export const roleGetByIdSuccess = (response: IResponseCollection<IRoleDetail>) => action(RoleAction.GET_BY_ID_SUCCESS, response);
export const roleGetByIdError = (message: string) => action(RoleAction.GET_BY_ID_ERROR, message);
export const roleGetByIdDispose = () => action(RoleAction.GET_BY_ID_DISPOSE);