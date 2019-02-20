import { 
  IEmployeeEducationAllRequest, 
  IEmployeeEducationByIdRequest, 
  IEmployeeEducationDeleteRequest, 
  IEmployeeEducationListRequest, 
  IEmployeeEducationPostRequest, 
  IEmployeeEducationPutRequest 
} from '@account/classes/queries/employeeEducation';
import { 
  IEmployeeEducation, 
  IEmployeeEducationDetail, 
  IEmployeeEducationList 
} from '@account/classes/response/employeeEducation';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeEducationAction {
  GET_ALL_REQUEST = '@@account/employee/education/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/education/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/education/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/education/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/education/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/education/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/education/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/education/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/education/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/education/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/education/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/education/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/education/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/education/POST_SUCCESS',
  POST_ERROR = '@@account/employee/education/POST_ERROR',
  POST_DISPOSE = '@@account/employee/education/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/education/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/education/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/education/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/education/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/education/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/education/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/education/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/education/DELETE_DISPOSE'
}

// get all
export const accountEmployeeEducationGetAllRequest = (request: IEmployeeEducationAllRequest) => action(AccountEmployeeEducationAction.GET_ALL_REQUEST, request);
export const accountEmployeeEducationGetAllSuccess = (response: IResponseCollection<IEmployeeEducation>) => action(AccountEmployeeEducationAction.GET_ALL_SUCCESS, response);
export const accountEmployeeEducationGetAllError = (error: any) => action(AccountEmployeeEducationAction.GET_ALL_ERROR, error);
export const accountEmployeeEducationGetAllDispose = () => action(AccountEmployeeEducationAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeEducationGetListRequest = (request: IEmployeeEducationListRequest) => action(AccountEmployeeEducationAction.GET_LIST_REQUEST, request);
export const accountEmployeeEducationGetListSuccess = (response: IResponseCollection<IEmployeeEducationList>) => action(AccountEmployeeEducationAction.GET_LIST_SUCCESS, response);
export const accountEmployeeEducationGetListError = (error: any) => action(AccountEmployeeEducationAction.GET_LIST_ERROR, error);
export const accountEmployeeEducationGetListDispose = () => action(AccountEmployeeEducationAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeEducationGetByIdRequest = (request: IEmployeeEducationByIdRequest) => action(AccountEmployeeEducationAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeEducationGetByIdSuccess = (response: IResponseCollection<IEmployeeEducationDetail>) => action(AccountEmployeeEducationAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeEducationGetByIdError = (error: any) => action(AccountEmployeeEducationAction.GET_BY_ID_ERROR, error);
export const accountEmployeeEducationGetByIdDispose = () => action(AccountEmployeeEducationAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeEducationPostRequest = (request: IEmployeeEducationPostRequest) => action(AccountEmployeeEducationAction.POST_REQUEST, request);
export const accountEmployeeEducationPostSuccess = (response: IResponseSingle<IEmployeeEducation>) => action(AccountEmployeeEducationAction.POST_SUCCESS, response);
export const accountEmployeeEducationPostError = (error: any) => action(AccountEmployeeEducationAction.POST_ERROR, error);
export const accountEmployeeEducationPostDispose = () => action(AccountEmployeeEducationAction.POST_DISPOSE);

// put
export const accountEmployeeEducationPutRequest = (request: IEmployeeEducationPutRequest) => action(AccountEmployeeEducationAction.PUT_REQUEST, request);
export const accountEmployeeEducationPutSuccess = (response: IResponseSingle<IEmployeeEducation>) => action(AccountEmployeeEducationAction.PUT_SUCCESS, response);
export const accountEmployeeEducationPutError = (error: any) => action(AccountEmployeeEducationAction.PUT_ERROR, error);
export const accountEmployeeEducationPutDispose = () => action(AccountEmployeeEducationAction.PUT_DISPOSE);

// delete
export const accountEmployeeEducationDeleteRequest = (request: IEmployeeEducationDeleteRequest) => action(AccountEmployeeEducationAction.DELETE_REQUEST, request);
export const accountEmployeeEducationDeleteSuccess = (response: boolean) => action(AccountEmployeeEducationAction.DELETE_SUCCESS, response);
export const accountEmployeeEducationDeleteError = (error: any) => action(AccountEmployeeEducationAction.DELETE_ERROR, error);
export const accountEmployeeEducationDeleteDispose = () => action(AccountEmployeeEducationAction.DELETE_DISPOSE);
