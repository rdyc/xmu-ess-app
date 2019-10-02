import { IResponseCollection } from '@generic/interfaces';
import { IEmployeeKPIGetAllRequest } from '@kpi/classes/queries';
import { IEmployeeKPI } from '@kpi/classes/response';
import { action } from 'typesafe-actions';

export const enum EmployeeKPIAction {
  GET_ALL_REQUEST = '@@kpi/employeeKPI/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/employeeKPI/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/employeeKPI/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/employeeKPI/GET_ALL_DISPOSE',
}

// get all
export const EmployeeKPIGetAllRequest = (request: IEmployeeKPIGetAllRequest) => action(EmployeeKPIAction.GET_ALL_REQUEST, request);
export const EmployeeKPIGetAllSuccess = (response: IResponseCollection<IEmployeeKPI>) => action(EmployeeKPIAction.GET_ALL_SUCCESS, response);
export const EmployeeKPIGetAllError = (error: any) => action(EmployeeKPIAction.GET_ALL_ERROR, error);
export const EmployeeKPIGetAllDispose = () => action(EmployeeKPIAction.GET_ALL_DISPOSE);