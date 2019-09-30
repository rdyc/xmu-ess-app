import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IEmployeeLevelDeleteRequest, IEmployeeLevelGetAllRequest, IEmployeeLevelGetDetailRequest, IEmployeeLevelGetListRequest, IEmployeeLevelPostRequest, IEmployeeLevelPutRequest } from '@lookup/classes/queries';
import { IEmployeeLevel, IEmployeeLevelDetail, IEmployeeLevelList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupEmployeeLevelAction {
  GET_ALL_REQUEST = '@@lookup/employeeLevel/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/employeeLevel/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/employeeLevel/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/employeeLevel/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/employeeLevel/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/employeeLevel/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/employeeLevel/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/employeeLevel/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/employeeLevel/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/employeeLevel/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/employeeLevel/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/employeeLevel/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/employeeLevel/POST_REQUEST',
  POST_SUCCESS = '@@lookup/employeeLevel/POST_SUCCESS',
  POST_ERROR = '@@lookup/employeeLevel/POST_ERROR',
  POST_DISPOSE = '@@lookup/employeeLevel/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/employeeLevel/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/employeeLevel/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/employeeLevel/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/employeeLevel/DELETE_DISPOSE',
  DELETE_REQUEST = '@@lookup/employeeLevel/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/employeeLevel/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/employeeLevel/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/employeeLevel/DELETE_DISPOSE',
}

// get all
export const lookupEmployeeLevelGetAllRequest = (request: IEmployeeLevelGetAllRequest) => action(EmployeeLevelAction.GET_ALL_REQUEST, request);
export const lookupEmployeeLevelGetAllSuccess = (response: IResponseCollection<IEmployeeLevel>) => action(EmployeeLevelAction.GET_ALL_SUCCESS, response);
export const lookupEmployeeLevelGetAllError = (error: any) => action(EmployeeLevelAction.GET_ALL_ERROR, error);
export const lookupEmployeeLevelGetAllDispose = () => action(EmployeeLevelAction.GET_ALL_DISPOSE);

// get list
export const lookupEmployeeLevelGetListRequest = (request: IEmployeeLevelGetListRequest) => action(EmployeeLevelAction.GET_LIST_REQUEST, request);
export const lookupEmployeeLevelGetListSuccess = (response: IResponseCollection<IEmployeeLevelList>) => action(EmployeeLevelAction.GET_LIST_SUCCESS, response);
export const lookupEmployeeLevelGetListError = (error: any) => action(EmployeeLevelAction.GET_LIST_ERROR, error);
export const lookupEmployeeLevelGetListDispose = () => action(EmployeeLevelAction.GET_LIST_DISPOSE);

// get by id
export const lookupEmployeeLevelGetByIdRequest = (request: IEmployeeLevelGetDetailRequest) => action(EmployeeLevelAction.GET_BY_ID_REQUEST, request);
export const lookupEmployeeLevelGetByIdSuccess = (response: IResponseCollection<IEmployeeLevelDetail>) => action(EmployeeLevelAction.GET_BY_ID_SUCCESS, response);
export const lookupEmployeeLevelGetByIdError = (error: any) => action(EmployeeLevelAction.GET_BY_ID_ERROR, error);
export const lookupEmployeeLevelGetByIdDispose = () => action(EmployeeLevelAction.GET_BY_ID_DISPOSE);

// post
export const lookupEmployeeLevelPostRequest = (request: IEmployeeLevelPostRequest) => action(EmployeeLevelAction.POST_REQUEST, request);
export const lookupEmployeeLevelPostSuccess = (response: IResponseSingle<IEmployeeLevel>) => action(EmployeeLevelAction.POST_SUCCESS, response);
export const lookupEmployeeLevelPostError = (error: any) => action(EmployeeLevelAction.POST_ERROR, error);
export const lookupEmployeeLevelPostDispose = () => action(EmployeeLevelAction.POST_DISPOSE);

// put
export const lookupEmployeeLevelPutRequest = (request: IEmployeeLevelPutRequest) => action(EmployeeLevelAction.PUT_REQUEST, request);
export const lookupEmployeeLevelPutSuccess = (response: IResponseSingle<IEmployeeLevel>) => action(EmployeeLevelAction.PUT_SUCCESS, response);
export const lookupEmployeeLevelPutError = (error: any) => action(EmployeeLevelAction.PUT_ERROR, error);
export const lookupEmployeeLevelPutDispose = () => action(EmployeeLevelAction.PUT_DISPOSE);

// delete
export const lookupEmployeeLevelDeleteRequest = (request: IEmployeeLevelDeleteRequest) => action(EmployeeLevelAction.DELETE_REQUEST, request);
export const lookupEmployeeLevelDeleteSuccess = (response: boolean) => action(EmployeeLevelAction.DELETE_SUCCESS, response);
export const lookupEmployeeLevelDeleteError = (error: any) => action(EmployeeLevelAction.DELETE_ERROR, error);
export const lookupEmployeeLevelDeleteDispose = () => action(EmployeeLevelAction.DELETE_DISPOSE);