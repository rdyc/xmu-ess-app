import { IEmployeeAllKPIAssignRequest, IEmployeeKPIAssignAllRequest, IEmployeeKPIAssignByIdRequest } from '@account/classes/queries/employeeKPIAssign';
import { IEmployeeKPIAssign } from '@account/classes/response/employeeKPIAssign';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPIAssign } from '@kpi/classes/response';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeKPIAssignAction {
  GET_ALL_ASSIGN_REQUEST = '@@account/employeeKPIAssign/GET_ALL_ASSIGN_REQUEST',
  GET_ALL_ASSIGN_SUCCESS = '@@account/employeeKPIAssign/GET_ALL_ASSIGN_SUCCESS',
  GET_ALL_ASSIGN_ERROR = '@@account/employeeKPIAssign/GET_ALL_ASSIGN_ERROR',
  GET_ALL_ASSIGN_DISPOSE = '@@account/employeeKPIAssign/GET_ALL_ASSIGN_DISPOSE',
  GET_ALL_REQUEST = '@@account/employeeKPIAssign/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employeeKPIAssign/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employeeKPIAssign/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employeeKPIAssign/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employeeKPIAssign/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employeeKPIAssign/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employeeKPIAssign/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employeeKPIAssign/GET_BY_ID_DISPOSE',
}

// get all assign
export const accountEmployeeGetAllKPIAssignRequest = (request: IEmployeeAllKPIAssignRequest) => action(AccountEmployeeKPIAssignAction.GET_ALL_ASSIGN_REQUEST, request);
export const accountEmployeeGetAllKPIAssignSuccess = (response: IResponseCollection<IEmployeeKPIAssign>) => action(AccountEmployeeKPIAssignAction.GET_ALL_ASSIGN_SUCCESS, response);
export const accountEmployeeGetAllKPIAssignError = (error: any) => action(AccountEmployeeKPIAssignAction.GET_ALL_ASSIGN_ERROR, error);
export const accountEmployeeGetAllKPIAssignDispose = () => action(AccountEmployeeKPIAssignAction.GET_ALL_ASSIGN_DISPOSE);

// get all
export const accountEmployeeKPIAssignGetAllRequest = (request: IEmployeeKPIAssignAllRequest) => action(AccountEmployeeKPIAssignAction.GET_ALL_REQUEST, request);
export const accountEmployeeKPIAssignGetAllSuccess = (response: IResponseCollection<IKPIAssign>) => action(AccountEmployeeKPIAssignAction.GET_ALL_SUCCESS, response);
export const accountEmployeeKPIAssignGetAllError = (error: any) => action(AccountEmployeeKPIAssignAction.GET_ALL_ERROR, error);
export const accountEmployeeKPIAssignGetAllDispose = () => action(AccountEmployeeKPIAssignAction.GET_ALL_DISPOSE);

// get by id
export const accountEmployeeKPIAssignGetByIdRequest = (request: IEmployeeKPIAssignByIdRequest) => action(AccountEmployeeKPIAssignAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeKPIAssignGetByIdSuccess = (response: IResponseSingle<IKPIAssign>) => action(AccountEmployeeKPIAssignAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeKPIAssignGetByIdError = (error: any) => action(AccountEmployeeKPIAssignAction.GET_BY_ID_ERROR, error);
export const accountEmployeeKPIAssignGetByIdDispose = () => action(AccountEmployeeKPIAssignAction.GET_BY_ID_DISPOSE);
