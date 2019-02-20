import { 
  IEmployeeAccessDeleteRequest, 
  IEmployeeAccessGetAllRequest, 
  IEmployeeAccessGetDetailRequest, 
  IEmployeeAccessPostRequest, 
  IEmployeeAccessPutRequest 
} from '@account/classes/queries/employeeAccess';
import { IEmployeeAccessGetListRequest } from '@account/classes/queries/employeeAccess/IEmployeeAccessGetListRequest';
import { IEmployeeAccess, IEmployeeAccessList } from '@account/classes/response/employeeAccess';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeAccessAction {
  GET_ALL_REQUEST = '@@account/employeeAccess/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employeeAccess/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employeeAccess/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employeeAccess/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employeeAccess/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employeeAccess/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employeeAccess/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employeeAccess/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employeeAccess/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employeeAccess/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employeeAccess/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employeeAccess/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employeeAccess/POST_REQUEST',
  POST_SUCCESS = '@@account/employeeAccess/POST_SUCCESS',
  POST_ERROR = '@@account/employeeAccess/POST_ERROR',
  POST_DISPOSE = '@@account/employeeAccess/POST_DISPOSE',
  PUT_REQUEST = '@@account/employeeAccess/PUT_REQUEST',
  PUT_SUCCESS = '@@account/education/PUT_SUCCESS',
  PUT_ERROR = '@@account/employeeAccess/PUT_ERROR',
  PUT_DISPOSE = '@@account/employeeAccess/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employeeAccess/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employeeAccess/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employeeAccess/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employeeAccess/DELETE_DISPOSE'
}

// get all
export const accountEmployeeAccessGetAllRequest = (request: IEmployeeAccessGetAllRequest) => action(AccountEmployeeAccessAction.GET_ALL_REQUEST, request);
export const accountEmployeeAccessGetAllSuccess = (response: IResponseCollection<IEmployeeAccess>) => action(AccountEmployeeAccessAction.GET_ALL_SUCCESS, response);
export const accountEmployeeAccessGetAllError = (error: any) => action(AccountEmployeeAccessAction.GET_ALL_ERROR, error);
export const accountEmployeeAccessGetAllDispose = () => action(AccountEmployeeAccessAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeAccessGetListRequest = (request: IEmployeeAccessGetListRequest) => action(AccountEmployeeAccessAction.GET_LIST_REQUEST, request);
export const accountEmployeeAccessGetListSuccess = (response: IResponseCollection<IEmployeeAccessList>) => action(AccountEmployeeAccessAction.GET_LIST_SUCCESS, response);
export const accountEmployeeAccessGetListError = (error: any) => action(AccountEmployeeAccessAction.GET_LIST_ERROR, error);
export const accountEmployeeAccessGetListDispose = () => action(AccountEmployeeAccessAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeAccessGetByIdRequest = (request: IEmployeeAccessGetDetailRequest) => action(AccountEmployeeAccessAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeAccessGetByIdSuccess = (response: IResponseSingle<IEmployeeAccess>) => action(AccountEmployeeAccessAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeAccessGetByIdError = (error: any) => action(AccountEmployeeAccessAction.GET_BY_ID_ERROR, error);
export const accountEmployeeAccessGetByIdDispose = () => action(AccountEmployeeAccessAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeAccessPostRequest = (request: IEmployeeAccessPostRequest) => action(AccountEmployeeAccessAction.POST_REQUEST, request);
export const accountEmployeeAccessPostSuccess = (response: IResponseSingle<IEmployeeAccess>) => action(AccountEmployeeAccessAction.POST_SUCCESS, response);
export const accountEmployeeAccessPostError = (error: any) => action(AccountEmployeeAccessAction.POST_ERROR, error);
export const accountEmployeeAccessPostDispose = () => action(AccountEmployeeAccessAction.POST_DISPOSE);

// put
export const accountEmployeeAccessPutRequest = (request: IEmployeeAccessPutRequest) => action(AccountEmployeeAccessAction.PUT_REQUEST, request);
export const accountEmployeeAccessPutSuccess = (response: IResponseSingle<IEmployeeAccess>) => action(AccountEmployeeAccessAction.PUT_SUCCESS, response);
export const accountEmployeeAccessPutError = (error: any) => action(AccountEmployeeAccessAction.PUT_ERROR, error);
export const accountEmployeeAccessPutDispose = () => action(AccountEmployeeAccessAction.PUT_DISPOSE);

// delete
export const accountEmployeeAccessDeleteRequest = (request: IEmployeeAccessDeleteRequest) => action(AccountEmployeeAccessAction.DELETE_REQUEST, request);
export const accountEmployeeAccessDeleteSuccess = (response: boolean) => action(AccountEmployeeAccessAction.DELETE_SUCCESS, response);
export const accountEmployeeAccessDeleteError = (error: any) => action(AccountEmployeeAccessAction.DELETE_ERROR, error);
export const accountEmployeeAccessDeleteDispose = () => action(AccountEmployeeAccessAction.DELETE_DISPOSE);
