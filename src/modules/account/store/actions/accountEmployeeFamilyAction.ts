import { 
  IEmployeeFamilyAllRequest, 
  IEmployeeFamilyByIdRequest, 
  IEmployeeFamilyDeleteRequest, 
  IEmployeeFamilyListRequest, 
  IEmployeeFamilyPostRequest, 
  IEmployeeFamilyPutRequest 
} from '@account/classes/queries/employeeFamily';
import { 
  IEmployeeFamily, 
  IEmployeeFamilyDetail, 
  IEmployeeFamilyList 
} from '@account/classes/response/employeeFamily';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeFamilyAction {
  GET_ALL_REQUEST = '@@account/employee/family/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/family/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/family/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/family/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/family/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/family/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/family/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/family/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/family/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/family/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/family/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/family/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/family/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/family/POST_SUCCESS',
  POST_ERROR = '@@account/employee/family/POST_ERROR',
  POST_DISPOSE = '@@account/employee/family/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/family/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/family/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/family/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/family/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/family/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/family/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/family/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/family/DELETE_DISPOSE'
}

// get all
export const accountEmployeeFamilyGetAllRequest = (request: IEmployeeFamilyAllRequest) => action(AccountEmployeeFamilyAction.GET_ALL_REQUEST, request);
export const accountEmployeeFamilyGetAllSuccess = (response: IResponseCollection<IEmployeeFamily>) => action(AccountEmployeeFamilyAction.GET_ALL_SUCCESS, response);
export const accountEmployeeFamilyGetAllError = (message: string) => action(AccountEmployeeFamilyAction.GET_ALL_ERROR, message);
export const accountEmployeeFamilyGetAllDispose = () => action(AccountEmployeeFamilyAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeFamilyGetListRequest = (request: IEmployeeFamilyListRequest) => action(AccountEmployeeFamilyAction.GET_LIST_REQUEST, request);
export const accountEmployeeFamilyGetListSuccess = (response: IResponseCollection<IEmployeeFamilyList>) => action(AccountEmployeeFamilyAction.GET_LIST_SUCCESS, response);
export const accountEmployeeFamilyGetListError = (message: string) => action(AccountEmployeeFamilyAction.GET_LIST_ERROR, message);
export const accountEmployeeFamilyGetListDispose = () => action(AccountEmployeeFamilyAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeFamilyGetByIdRequest = (request: IEmployeeFamilyByIdRequest) => action(AccountEmployeeFamilyAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeFamilyGetByIdSuccess = (response: IResponseCollection<IEmployeeFamilyDetail>) => action(AccountEmployeeFamilyAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeFamilyGetByIdError = (message: string) => action(AccountEmployeeFamilyAction.GET_BY_ID_ERROR, message);
export const accountEmployeeFamilyGetByIdDispose = () => action(AccountEmployeeFamilyAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeFamilyPostRequest = (request: IEmployeeFamilyPostRequest) => action(AccountEmployeeFamilyAction.POST_REQUEST, request);
export const accountEmployeeFamilyPostSuccess = (response: IResponseSingle<IEmployeeFamily>) => action(AccountEmployeeFamilyAction.POST_SUCCESS, response);
export const accountEmployeeFamilyPostError = (message: string) => action(AccountEmployeeFamilyAction.POST_ERROR, message);
export const accountEmployeeFamilyPostDispose = () => action(AccountEmployeeFamilyAction.POST_DISPOSE);

// put
export const accountEmployeeFamilyPutRequest = (request: IEmployeeFamilyPutRequest) => action(AccountEmployeeFamilyAction.PUT_REQUEST, request);
export const accountEmployeeFamilyPutSuccess = (response: IResponseSingle<IEmployeeFamily>) => action(AccountEmployeeFamilyAction.PUT_SUCCESS, response);
export const accountEmployeeFamilyPutError = (message: string) => action(AccountEmployeeFamilyAction.PUT_ERROR, message);
export const accountEmployeeFamilyPutDispose = () => action(AccountEmployeeFamilyAction.PUT_DISPOSE);

// delete
export const accountEmployeeFamilyDeleteRequest = (request: IEmployeeFamilyDeleteRequest) => action(AccountEmployeeFamilyAction.DELETE_REQUEST, request);
export const accountEmployeeFamilyDeleteSuccess = (response: boolean) => action(AccountEmployeeFamilyAction.DELETE_SUCCESS, response);
export const accountEmployeeFamilyDeleteError = (message: string) => action(AccountEmployeeFamilyAction.DELETE_ERROR, message);
export const accountEmployeeFamilyDeleteDispose = () => action(AccountEmployeeFamilyAction.DELETE_DISPOSE);
