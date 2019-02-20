import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeDeleteRequest, IEmployeeListRequest, IEmployeePostRequest, IEmployeePutRequest } from '@account/classes/queries';
import { IEmployee } from '@account/classes/response';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeAction {
  GET_ALL_REQUEST = '@@account/employee/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/POST_SUCCESS',
  POST_ERROR = '@@account/employee/POST_ERROR',
  POST_DISPOSE = '@@account/employee/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/DELETE_DISPOSE'
}

// get all
export const accountEmployeeGetAllRequest = (request: IEmployeeAllRequest) => action(AccountEmployeeAction.GET_ALL_REQUEST, request);
export const accountEmployeeGetAllSuccess = (response: IResponseCollection<IEmployee>) => action(AccountEmployeeAction.GET_ALL_SUCCESS, response);
export const accountEmployeeGetAllError = (error: any) => action(AccountEmployeeAction.GET_ALL_ERROR, error);
export const accountEmployeeGetAllDispose = () => action(AccountEmployeeAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeGetListRequest = (request: IEmployeeListRequest) => action(AccountEmployeeAction.GET_LIST_REQUEST, request);
export const accountEmployeeGetListSuccess = (response: IResponseCollection<IEmployee>) => action(AccountEmployeeAction.GET_LIST_SUCCESS, response);
export const accountEmployeeGetListError = (error: any) => action(AccountEmployeeAction.GET_LIST_ERROR, error);
export const accountEmployeeGetListDispose = () => action(AccountEmployeeAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeGetByIdRequest = (request: IEmployeeByIdRequest) => action(AccountEmployeeAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeGetByIdSuccess = (response: IResponseCollection<IEmployee>) => action(AccountEmployeeAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeGetByIdError = (error: any) => action(AccountEmployeeAction.GET_BY_ID_ERROR, error);
export const accountEmployeeGetByIdDispose = () => action(AccountEmployeeAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeePostRequest = (request: IEmployeePostRequest) => action(AccountEmployeeAction.POST_REQUEST, request);
export const accountEmployeePostSuccess = (response: IResponseSingle<IEmployee>) => action(AccountEmployeeAction.POST_SUCCESS, response);
export const accountEmployeePostError = (error: any) => action(AccountEmployeeAction.POST_ERROR, error);
export const accountEmployeePostDispose = () => action(AccountEmployeeAction.POST_DISPOSE);

// put
export const accountEmployeePutRequest = (request: IEmployeePutRequest) => action(AccountEmployeeAction.PUT_REQUEST, request);
export const accountEmployeePutSuccess = (response: IResponseSingle<IEmployee>) => action(AccountEmployeeAction.PUT_SUCCESS, response);
export const accountEmployeePutError = (error: any) => action(AccountEmployeeAction.PUT_ERROR, error);
export const accountEmployeePutDispose = () => action(AccountEmployeeAction.PUT_DISPOSE);

// delete
export const accountEmployeeDeleteRequest = (request: IEmployeeDeleteRequest) => action(AccountEmployeeAction.DELETE_REQUEST, request);
export const accountEmployeeDeleteSuccess = (response: boolean) => action(AccountEmployeeAction.DELETE_SUCCESS, response);
export const accountEmployeeDeleteError = (error: any) => action(AccountEmployeeAction.DELETE_ERROR, error);
export const accountEmployeeDeleteDispose = () => action(AccountEmployeeAction.DELETE_DISPOSE);
