import { 
  IEmployeeAllKPIAssignRequest,
  IEmployeeAllKPIFinalRequest,
  IEmployeeKPIFinalAllRequest,
  IEmployeeKPIFinalByIdRequest
} from '@account/classes/queries/employeeKPI';
import { IEmployeeKPIAssign, IEmployeeKPIFinal, IKPIFinal } from '@account/classes/response/employeeKPI';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeKPIAction {
  GET_ALL_ASSIGN_REQUEST = '@@account/employeeKPI/GET_ALL_ASSIGN_REQUEST',
  GET_ALL_ASSIGN_SUCCESS = '@@account/employeeKPI/GET_ALL_ASSIGN_SUCCESS',
  GET_ALL_ASSIGN_ERROR = '@@account/employeeKPI/GET_ALL_ASSIGN_ERROR',
  GET_ALL_ASSIGN_DISPOSE = '@@account/employeeKPI/GET_ALL_ASSIGN_DISPOSE',
  GET_ALL_FINAL_REQUEST = '@@account/employeeKPI/GET_ALL_FINAL_REQUEST',
  GET_ALL_FINAL_SUCCESS = '@@account/employeeKPI/GET_ALL_FINAL_SUCCESS',
  GET_ALL_FINAL_ERROR = '@@account/employeeKPI/GET_ALL_FINAL_ERROR',
  GET_ALL_FINAL_DISPOSE = '@@account/employeeKPI/GET_ALL_FINAL_DISPOSE',
  GET_ALL_REQUEST = '@@account/employeeKPI/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employeeKPI/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employeeKPI/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employeeKPI/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employeeKPI/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employeeKPI/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employeeKPI/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employeeKPI/GET_BY_ID_DISPOSE',
}

// get all assign
export const accountEmployeeGetAllKPIAssignRequest = (request: IEmployeeAllKPIAssignRequest) => action(AccountEmployeeKPIAction.GET_ALL_ASSIGN_REQUEST, request);
export const accountEmployeeGetAllKPIAssignSuccess = (response: IResponseCollection<IEmployeeKPIAssign>) => action(AccountEmployeeKPIAction.GET_ALL_ASSIGN_SUCCESS, response);
export const accountEmployeeGetAllKPIAssignError = (error: any) => action(AccountEmployeeKPIAction.GET_ALL_ASSIGN_ERROR, error);
export const accountEmployeeGetAllKPIAssignDispose = () => action(AccountEmployeeKPIAction.GET_ALL_ASSIGN_DISPOSE);

// get all final
export const accountEmployeeGetAllKPIFinalRequest = (request: IEmployeeAllKPIFinalRequest) => action(AccountEmployeeKPIAction.GET_ALL_FINAL_REQUEST, request);
export const accountEmployeeGetAllKPIFinalSuccess = (response: IResponseCollection<IEmployeeKPIFinal>) => action(AccountEmployeeKPIAction.GET_ALL_FINAL_SUCCESS, response);
export const accountEmployeeGetAllKPIFinalError = (error: any) => action(AccountEmployeeKPIAction.GET_ALL_FINAL_ERROR, error);
export const accountEmployeeGetAllKPIFinalDispose = () => action(AccountEmployeeKPIAction.GET_ALL_FINAL_DISPOSE);

// get all
export const accountEmployeeKPIFinalGetAllRequest = (request: IEmployeeKPIFinalAllRequest) => action(AccountEmployeeKPIAction.GET_ALL_REQUEST, request);
export const accountEmployeeKPIFinalGetAllSuccess = (response: IResponseCollection<IKPIFinal>) => action(AccountEmployeeKPIAction.GET_ALL_SUCCESS, response);
export const accountEmployeeKPIFinalGetAllError = (error: any) => action(AccountEmployeeKPIAction.GET_ALL_ERROR, error);
export const accountEmployeeKPIFinalGetAllDispose = () => action(AccountEmployeeKPIAction.GET_ALL_DISPOSE);

// get by id
export const accountEmployeeKPIFinalGetByIdRequest = (request: IEmployeeKPIFinalByIdRequest) => action(AccountEmployeeKPIAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeKPIFinalGetByIdSuccess = (response: IResponseSingle<IKPIFinal>) => action(AccountEmployeeKPIAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeKPIFinalGetByIdError = (error: any) => action(AccountEmployeeKPIAction.GET_BY_ID_ERROR, error);
export const accountEmployeeKPIFinalGetByIdDispose = () => action(AccountEmployeeKPIAction.GET_BY_ID_DISPOSE);
