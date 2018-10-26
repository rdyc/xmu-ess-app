import { IResponseCollection } from '@generic/interfaces';
import { ILookupRoleAllRequest, ILookupRoleByIdRequest, ILookupRoleListRequest } from '@lookup/classes/queries/role';
import { IRole, IRoleDetail, IRoleList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupRoleAction {
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
export const lookupRoleGetAllRequest = (request: ILookupRoleAllRequest) => action(LookupRoleAction.GET_ALL_REQUEST, request);
export const lookupRoleGetAllSuccess = (response: IResponseCollection<IRole>) => action(LookupRoleAction.GET_ALL_SUCCESS, response);
export const lookupRoleGetAllError = (message: string) => action(LookupRoleAction.GET_ALL_ERROR, message);
export const lookupRoleGetAllDispose = () => action(LookupRoleAction.GET_ALL_DISPOSE);

// get list
export const lookupRoleGetListRequest = (request: ILookupRoleListRequest) => action(LookupRoleAction.GET_LIST_REQUEST, request);
export const lookupRoleGetListSuccess = (response: IResponseCollection<IRoleList>) => action(LookupRoleAction.GET_LIST_SUCCESS, response);
export const lookupRoleGetListError = (message: string) => action(LookupRoleAction.GET_LIST_ERROR, message);
export const lookupRoleGetListDispose = () => action(LookupRoleAction.GET_LIST_DISPOSE);

// get by id
export const lookupRoleGetByIdRequest = (request: ILookupRoleByIdRequest) => action(LookupRoleAction.GET_BY_ID_REQUEST, request);
export const lookupRoleGetByIdSuccess = (response: IResponseCollection<IRoleDetail>) => action(LookupRoleAction.GET_BY_ID_SUCCESS, response);
export const lookupRoleGetByIdError = (message: string) => action(LookupRoleAction.GET_BY_ID_ERROR, message);
export const lookupRoleGetByIdDispose = () => action(LookupRoleAction.GET_BY_ID_DISPOSE);