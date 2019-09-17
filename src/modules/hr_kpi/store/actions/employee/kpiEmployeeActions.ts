import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IKPIEmployeeGetAllRequest, 
  IKPIEmployeeGetByIdRequest, 
  IKPIEmployeePostRequest, 
  IKPIEmployeePutRequest,
} from '@kpi/classes/queries/employee';
import { IKPIEmployee, IKPIEmployeeDetail } from '@kpi/classes/response/employee';
import { action } from 'typesafe-actions';

export const enum KPIEmployeeAction {
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
  PUT_DISPOSE = '@@kpi/employee/PUT_DISPOSE',
}

// get all
export const KPIEmployeeGetAllRequest = (request: IKPIEmployeeGetAllRequest) => action(KPIEmployeeAction.GET_ALL_REQUEST, request);
export const KPIEmployeeGetAllSuccess = (response: IResponseCollection<IKPIEmployee>) => action(KPIEmployeeAction.GET_ALL_SUCCESS, response);
export const KPIEmployeeGetAllError = (error: any) => action(KPIEmployeeAction.GET_ALL_ERROR, error);
export const KPIEmployeeGetAllDispose = () => action(KPIEmployeeAction.GET_ALL_DISPOSE);

// get by id
export const KPIEmployeeGetByIdRequest = (request: IKPIEmployeeGetByIdRequest) => action(KPIEmployeeAction.GET_BY_ID_REQUEST, request);
export const KPIEmployeeGetByIdSuccess = (response: IResponseSingle<IKPIEmployeeDetail>) => action(KPIEmployeeAction.GET_BY_ID_SUCCESS, response);
export const KPIEmployeeGetByIdError = (error: any) => action(KPIEmployeeAction.GET_BY_ID_ERROR, error);
export const KPIEmployeeGetByIdDispose = () => action(KPIEmployeeAction.GET_BY_ID_DISPOSE);

// post
export const KPIEmployeePostRequest = (request: IKPIEmployeePostRequest) => action(KPIEmployeeAction.POST_REQUEST, request);
export const KPIEmployeePostSuccess = (response: IResponseCollection<IKPIEmployee>) => action(KPIEmployeeAction.POST_SUCCESS, response);
export const KPIEmployeePostError = (error: any) => action(KPIEmployeeAction.POST_ERROR, error);
export const KPIEmployeePostDispose = () => action(KPIEmployeeAction.POST_DISPOSE);

// put
export const KPIEmployeePutRequest = (request: IKPIEmployeePutRequest) => action(KPIEmployeeAction.PUT_REQUEST, request);
export const KPIEmployeePutSuccess = (response: IResponseSingle<IKPIEmployee>) => action(KPIEmployeeAction.PUT_SUCCESS, response);
export const KPIEmployeePutError = (error: any) => action(KPIEmployeeAction.PUT_ERROR, error);
export const KPIEmployeePutDispose = () => action(KPIEmployeeAction.PUT_DISPOSE);