import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IKPIAssignGetAllRequest, 
  IKPIAssignGetByIdRequest, 
  IKPIAssignPostBulkRequest,
  IKPIAssignPutRequest,
} from '@kpi/classes/queries/assign';
import { IKPIAssign, IKPIAssignDetail } from '@kpi/classes/response/assign';
import { action } from 'typesafe-actions';

export const enum KPIAssignAction {
  GET_ALL_REQUEST = '@@kpi/assign/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/assign/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/assign/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/assign/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/assign/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/assign/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/assign/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/assign/GET_BY_ID_DISPOSE',
  POST_BULK_REQUEST = '@@kpi/assign/POST_BULK_REQUEST',
  POST_BULK_SUCCESS = '@@kpi/assign/POST_BULK_SUCCESS',
  POST_BULK_ERROR = '@@kpi/assign/POST_BULK_ERROR',
  POST_BULK_DISPOSE = '@@kpi/assign/POST_BULK_DISPOSE',
  PUT_REQUEST = '@@kpi/assign/PUT_REQUEST',
  PUT_SUCCESS = '@@kpi/assign/PUT_SUCCESS',
  PUT_ERROR = '@@kpi/assign/PUT_ERROR',
  PUT_DISPOSE = '@@kpi/assign/PUT_DISPOSE',
}

// get all
export const KPIAssignGetAllRequest = (request: IKPIAssignGetAllRequest) => action(KPIAssignAction.GET_ALL_REQUEST, request);
export const KPIAssignGetAllSuccess = (response: IResponseCollection<IKPIAssign>) => action(KPIAssignAction.GET_ALL_SUCCESS, response);
export const KPIAssignGetAllError = (error: any) => action(KPIAssignAction.GET_ALL_ERROR, error);
export const KPIAssignGetAllDispose = () => action(KPIAssignAction.GET_ALL_DISPOSE);

// get by id
export const KPIAssignGetByIdRequest = (request: IKPIAssignGetByIdRequest) => action(KPIAssignAction.GET_BY_ID_REQUEST, request);
export const KPIAssignGetByIdSuccess = (response: IResponseSingle<IKPIAssignDetail>) => action(KPIAssignAction.GET_BY_ID_SUCCESS, response);
export const KPIAssignGetByIdError = (error: any) => action(KPIAssignAction.GET_BY_ID_ERROR, error);
export const KPIAssignGetByIdDispose = () => action(KPIAssignAction.GET_BY_ID_DISPOSE);

// post bulk
export const KPIAssignPostBulkRequest = (request: IKPIAssignPostBulkRequest) => action(KPIAssignAction.POST_BULK_REQUEST, request);
export const KPIAssignPostBulkSuccess = (response: IResponseCollection<IKPIAssign>) => action(KPIAssignAction.POST_BULK_SUCCESS, response);
export const KPIAssignPostBulkError = (error: any) => action(KPIAssignAction.POST_BULK_ERROR, error);
export const KPIAssignPostBulkDispose = () => action(KPIAssignAction.POST_BULK_DISPOSE);

// put
export const KPIAssignPutRequest = (request: IKPIAssignPutRequest) => action(KPIAssignAction.PUT_REQUEST, request);
export const KPIAssignPutSuccess = (response: IResponseSingle<IKPIAssign>) => action(KPIAssignAction.PUT_SUCCESS, response);
export const KPIAssignPutError = (error: any) => action(KPIAssignAction.PUT_ERROR, error);
export const KPIAssignPutDispose = () => action(KPIAssignAction.PUT_DISPOSE);