import { IEmployeeAccessList } from '@account/classes';
import { IEmployeeAccessGetAllRequest, IEmployeeAccessGetDetailRequest } from '@account/classes/queries';
import { IEmployeeAccessGetListRequest } from '@account/classes/queries/IEmployeeAccessGetListRequest';
import { IEmployeeAccess } from '@account/classes/response/IEmployeeAccess';
import { IResponseCollection } from '@generic/interfaces';
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
}

// get all
export const accountEmployeeAccessGetAllRequest = (request: IEmployeeAccessGetAllRequest) => action(AccountEmployeeAccessAction.GET_ALL_REQUEST, request);
export const accountEmployeeAccessGetAllSuccess = (response: IResponseCollection<IEmployeeAccess>) => action(AccountEmployeeAccessAction.GET_ALL_SUCCESS, response);
export const accountEmployeeAccessGetAllError = (message: string) => action(AccountEmployeeAccessAction.GET_ALL_ERROR, message);
export const accountEmployeeAccessGetAllDispose = () => action(AccountEmployeeAccessAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeAccessGetListRequest = (request: IEmployeeAccessGetListRequest) => action(AccountEmployeeAccessAction.GET_LIST_REQUEST, request);
export const accountEmployeeAccessGetListSuccess = (response: IResponseCollection<IEmployeeAccessList>) => action(AccountEmployeeAccessAction.GET_LIST_SUCCESS, response);
export const accountEmployeeAccessGetListError = (message: string) => action(AccountEmployeeAccessAction.GET_LIST_ERROR, message);
export const accountEmployeeAccessGetListDispose = () => action(AccountEmployeeAccessAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeAccessGetByIdRequest = (request: IEmployeeAccessGetDetailRequest) => action(AccountEmployeeAccessAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeAccessGetByIdSuccess = (response: IResponseCollection<IEmployeeAccess>) => action(AccountEmployeeAccessAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeAccessGetByIdError = (message: string) => action(AccountEmployeeAccessAction.GET_BY_ID_ERROR, message);
export const accountEmployeeAccessGetByIdDispose = () => action(AccountEmployeeAccessAction.GET_BY_ID_DISPOSE);