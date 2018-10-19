import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeListRequest } from '@account/classes/queries';
import { IEmployee } from '@account/classes/response';
import { IResponseCollection } from '@generic/interfaces';
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
}

// get all
export const accountEmployeeGetAllRequest = (request: IEmployeeAllRequest) => action(AccountEmployeeAction.GET_ALL_REQUEST, request);
export const accountEmployeeGetAllSuccess = (response: IResponseCollection<IEmployee>) => action(AccountEmployeeAction.GET_ALL_SUCCESS, response);
export const accountEmployeeGetAllError = (message: string) => action(AccountEmployeeAction.GET_ALL_ERROR, message);
export const accountEmployeeGetAllDispose = () => action(AccountEmployeeAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeGetListRequest = (request: IEmployeeListRequest) => action(AccountEmployeeAction.GET_LIST_REQUEST, request);
export const accountEmployeeGetListSuccess = (response: IResponseCollection<IEmployee>) => action(AccountEmployeeAction.GET_LIST_SUCCESS, response);
export const accountEmployeeGetListError = (message: string) => action(AccountEmployeeAction.GET_LIST_ERROR, message);
export const accountEmployeeGetListDispose = () => action(AccountEmployeeAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeGetByIdRequest = (request: IEmployeeByIdRequest) => action(AccountEmployeeAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeGetByIdSuccess = (response: IResponseCollection<IEmployee>) => action(AccountEmployeeAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeGetByIdError = (message: string) => action(AccountEmployeeAction.GET_BY_ID_ERROR, message);
export const accountEmployeeGetByIdDispose = () => action(AccountEmployeeAction.GET_BY_ID_DISPOSE);