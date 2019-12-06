import { 
  IEmployeeAllKPIFinalRequest,
  IEmployeeKPIFinalAllRequest,
  IEmployeeKPIFinalByIdRequest
} from '@account/classes/queries/employeeKPIFinal';
import { IEmployeeKPIFinal, IKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeKPIFinalAction {
  GET_ALL_FINAL_REQUEST = '@@account/employeeKPIFinal/GET_ALL_FINAL_REQUEST',
  GET_ALL_FINAL_SUCCESS = '@@account/employeeKPIFinal/GET_ALL_FINAL_SUCCESS',
  GET_ALL_FINAL_ERROR = '@@account/employeeKPIFinal/GET_ALL_FINAL_ERROR',
  GET_ALL_FINAL_DISPOSE = '@@account/employeeKPIFinal/GET_ALL_FINAL_DISPOSE',
  GET_ALL_REQUEST = '@@account/employeeKPIFinal/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employeeKPIFinal/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employeeKPIFinal/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employeeKPIFinal/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employeeKPIFinal/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employeeKPIFinal/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employeeKPIFinal/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employeeKPIFinal/GET_BY_ID_DISPOSE',
}

// get all final
export const accountEmployeeGetAllKPIFinalRequest = (request: IEmployeeAllKPIFinalRequest) => action(AccountEmployeeKPIFinalAction.GET_ALL_FINAL_REQUEST, request);
export const accountEmployeeGetAllKPIFinalSuccess = (response: IResponseCollection<IEmployeeKPIFinal>) => action(AccountEmployeeKPIFinalAction.GET_ALL_FINAL_SUCCESS, response);
export const accountEmployeeGetAllKPIFinalError = (error: any) => action(AccountEmployeeKPIFinalAction.GET_ALL_FINAL_ERROR, error);
export const accountEmployeeGetAllKPIFinalDispose = () => action(AccountEmployeeKPIFinalAction.GET_ALL_FINAL_DISPOSE);

// get all
export const accountEmployeeKPIFinalGetAllRequest = (request: IEmployeeKPIFinalAllRequest) => action(AccountEmployeeKPIFinalAction.GET_ALL_REQUEST, request);
export const accountEmployeeKPIFinalGetAllSuccess = (response: IResponseCollection<IKPIFinal>) => action(AccountEmployeeKPIFinalAction.GET_ALL_SUCCESS, response);
export const accountEmployeeKPIFinalGetAllError = (error: any) => action(AccountEmployeeKPIFinalAction.GET_ALL_ERROR, error);
export const accountEmployeeKPIFinalGetAllDispose = () => action(AccountEmployeeKPIFinalAction.GET_ALL_DISPOSE);

// get by id
export const accountEmployeeKPIFinalGetByIdRequest = (request: IEmployeeKPIFinalByIdRequest) => action(AccountEmployeeKPIFinalAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeKPIFinalGetByIdSuccess = (response: IResponseSingle<IKPIFinal>) => action(AccountEmployeeKPIFinalAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeKPIFinalGetByIdError = (error: any) => action(AccountEmployeeKPIFinalAction.GET_BY_ID_ERROR, error);
export const accountEmployeeKPIFinalGetByIdDispose = () => action(AccountEmployeeKPIFinalAction.GET_BY_ID_DISPOSE);
