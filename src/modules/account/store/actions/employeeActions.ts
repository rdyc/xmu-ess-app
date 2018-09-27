import { action } from 'typesafe-actions';
import { IResponseCollection } from '@generic/interfaces';
import { IEmployeeAllRequest, IEmployeeListRequest, IEmployeeByIdRequest } from '@account/interfaces/queries';
import { IEmployee } from '@account/interfaces/response';

export const enum EmployeeAction {
  GET_ALL_REQUEST = '@@employee/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@employee/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@employee/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@employee/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@employee/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@employee/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@employee/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@employee/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@employee/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@employee/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@employee/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@employee/GET_BY_ID_DISPOSE',
}

// get all
export const employeeGetAllRequest = (request: IEmployeeAllRequest) => action(EmployeeAction.GET_ALL_REQUEST, request);
export const employeeGetAllSuccess = (response: IResponseCollection<IEmployee>) => action(EmployeeAction.GET_ALL_SUCCESS, response);
export const employeeGetAllError = (message: string) => action(EmployeeAction.GET_ALL_ERROR, message);
export const employeeGetAllDispose = () => action(EmployeeAction.GET_ALL_DISPOSE);

// get list
export const employeeGetListRequest = (request: IEmployeeListRequest) => action(EmployeeAction.GET_LIST_REQUEST, request);
export const employeeGetListSuccess = (response: IResponseCollection<IEmployee>) => action(EmployeeAction.GET_LIST_SUCCESS, response);
export const employeeGetListError = (message: string) => action(EmployeeAction.GET_LIST_ERROR, message);
export const employeeGetListDispose = () => action(EmployeeAction.GET_LIST_DISPOSE);

// get by id
export const employeeGetByIdRequest = (request: IEmployeeByIdRequest) => action(EmployeeAction.GET_BY_ID_REQUEST, request);
export const employeeGetByIdSuccess = (response: IResponseCollection<IEmployee>) => action(EmployeeAction.GET_BY_ID_SUCCESS, response);
export const employeeGetByIdError = (message: string) => action(EmployeeAction.GET_BY_ID_ERROR, message);
export const employeeGetByIdDispose = () => action(EmployeeAction.GET_BY_ID_DISPOSE);