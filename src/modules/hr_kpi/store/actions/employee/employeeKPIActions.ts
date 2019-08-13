import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IEmployeeKPIGetAllRequest, IEmployeeKPIGetByIdRequest, IEmployeeKPIPostRequest, IEmployeeKPIPutRequest } from '@kpi/classes/queries/employee';
import { IEmployeeKPI, IEmployeeKPIDetail } from '@kpi/classes/response/employee';
import { action } from 'typesafe-actions';

export const enum EmployeeKPIAction {
  GET_ALL_REQUEST = '@@kpi/employee/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/employee/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/employee/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/employee/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/employee/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/employee/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/employee/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/employee/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@kpi/employee/POST_REQUEST',
  POST_SUCCESS = '@@kpi/employee/POST_SUCCESS',
  POST_ERROR = '@@kpi/employee/POST_ERROR',
  POST_DISPOSE = '@@kpi/employee/POST_DISPOSE',
  PUT_REQUEST = '@@kpi/employee/PUT_REQUEST',
  PUT_SUCCESS = '@@kpi/employee/PUT_SUCCESS',
  PUT_ERROR = '@@kpi/employee/PUT_ERROR',
  PUT_DISPOSE = '@@kpi/employee/PUT_DISPOSE'
}

// get all
export const EmployeeKPIGetAllRequest = (request: IEmployeeKPIGetAllRequest) => action(EmployeeKPIAction.GET_ALL_REQUEST, request);
export const EmployeeKPIGetAllSuccess = (response: IResponseCollection<IEmployeeKPI>) => action(EmployeeKPIAction.GET_ALL_SUCCESS, response);
export const EmployeeKPIGetAllError = (error: any) => action(EmployeeKPIAction.GET_ALL_ERROR, error);
export const EmployeeKPIGetAllDispose = () => action(EmployeeKPIAction.GET_ALL_DISPOSE);

// get by id
export const EmployeeKPIGetByIdRequest = (request: IEmployeeKPIGetByIdRequest) => action(EmployeeKPIAction.GET_BY_ID_REQUEST, request);
export const EmployeeKPIGetByIdSuccess = (response: IResponseSingle<IEmployeeKPIDetail>) => action(EmployeeKPIAction.GET_BY_ID_SUCCESS, response);
export const EmployeeKPIGetByIdError = (error: any) => action(EmployeeKPIAction.GET_BY_ID_ERROR, error);
export const EmployeeKPIGetByIdDispose = () => action(EmployeeKPIAction.GET_BY_ID_DISPOSE);

// post
export const EmployeeKPIPostRequest = (request: IEmployeeKPIPostRequest) => action(EmployeeKPIAction.POST_REQUEST, request);
export const EmployeeKPIPostSuccess = (response: IResponseSingle<IEmployeeKPI>) => action(EmployeeKPIAction.POST_SUCCESS, response);
export const EmployeeKPIPostError = (error: any) => action(EmployeeKPIAction.POST_ERROR, error);
export const EmployeeKPIPostDispose = () => action(EmployeeKPIAction.POST_DISPOSE);

// put
export const EmployeeKPIPutRequest = (request: IEmployeeKPIPutRequest) => action(EmployeeKPIAction.PUT_REQUEST, request);
export const EmployeeKPIPutSuccess = (response: IResponseSingle<IEmployeeKPI>) => action(EmployeeKPIAction.PUT_SUCCESS, response);
export const EmployeeKPIPutError = (error: any) => action(EmployeeKPIAction.PUT_ERROR, error);
export const EmployeeKPIPutDispose = () => action(EmployeeKPIAction.PUT_DISPOSE);