import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupRoleDeleteRequest, ILookupRoleGetAllRequest, ILookupRoleGetDetailRequest, ILookupRoleGetListRequest, ILookupRolePostRequest, ILookupRolePutRequest } from '@lookup/classes/queries/role';
import { IRole, IRoleDetail, IRoleList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupRoleAction {
  GET_ALL_REQUEST = '@@lookup/role/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/role/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/role/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/role/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/role/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/role/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/role/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/role/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/role/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/role/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/role/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/role/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/role/POST_REQUEST',
  POST_SUCCESS = '@@lookup/role/POST_SUCCESS',
  POST_ERROR = '@@lookup/role/POST_ERROR',
  POST_DISPOSE = '@@lookup/role/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/role/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/role/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/role/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/role/DELETE_DISPOSE',
  DELETE_REQUEST = '@@lookup/role/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/role/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/role/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/role/DELETE_DISPOSE',
}

// get all
export const lookupRoleGetAllRequest = (request: ILookupRoleGetAllRequest) => action(LookupRoleAction.GET_ALL_REQUEST, request);
export const lookupRoleGetAllSuccess = (response: IResponseCollection<IRole>) => action(LookupRoleAction.GET_ALL_SUCCESS, response);
export const lookupRoleGetAllError = (error: any) => action(LookupRoleAction.GET_ALL_ERROR, error);
export const lookupRoleGetAllDispose = () => action(LookupRoleAction.GET_ALL_DISPOSE);

// get list
export const lookupRoleGetListRequest = (request: ILookupRoleGetListRequest) => action(LookupRoleAction.GET_LIST_REQUEST, request);
export const lookupRoleGetListSuccess = (response: IResponseCollection<IRoleList>) => action(LookupRoleAction.GET_LIST_SUCCESS, response);
export const lookupRoleGetListError = (error: any) => action(LookupRoleAction.GET_LIST_ERROR, error);
export const lookupRoleGetListDispose = () => action(LookupRoleAction.GET_LIST_DISPOSE);

// get by id
export const lookupRoleGetByIdRequest = (request: ILookupRoleGetDetailRequest) => action(LookupRoleAction.GET_BY_ID_REQUEST, request);
export const lookupRoleGetByIdSuccess = (response: IResponseCollection<IRoleDetail>) => action(LookupRoleAction.GET_BY_ID_SUCCESS, response);
export const lookupRoleGetByIdError = (error: any) => action(LookupRoleAction.GET_BY_ID_ERROR, error);
export const lookupRoleGetByIdDispose = () => action(LookupRoleAction.GET_BY_ID_DISPOSE);

// post
export const lookupRolePostRequest = (request: ILookupRolePostRequest) => action(LookupRoleAction.POST_REQUEST, request);
export const lookupRolePostSuccess = (response: IResponseSingle<IRole>) => action(LookupRoleAction.POST_SUCCESS, response);
export const lookupRolePostError = (error: any) => action(LookupRoleAction.POST_ERROR, error);
export const lookupRolePostDispose = () => action(LookupRoleAction.POST_DISPOSE);

// put
export const lookupRolePutRequest = (request: ILookupRolePutRequest) => action(LookupRoleAction.PUT_REQUEST, request);
export const lookupRolePutSuccess = (response: IResponseSingle<IRole>) => action(LookupRoleAction.PUT_SUCCESS, response);
export const lookupRolePutError = (error: any) => action(LookupRoleAction.PUT_ERROR, error);
export const lookupRolePutDispose = () => action(LookupRoleAction.PUT_DISPOSE);

// delete
export const lookupRoleDeleteRequest = (request: ILookupRoleDeleteRequest) => action(LookupRoleAction.DELETE_REQUEST, request);
export const lookupRoleDeleteSuccess = (response: boolean) => action(LookupRoleAction.DELETE_SUCCESS, response);
export const lookupRoleDeleteError = (error: any) => action(LookupRoleAction.DELETE_ERROR, error);
export const lookupRoleDeleteDispose = () => action(LookupRoleAction.DELETE_DISPOSE);