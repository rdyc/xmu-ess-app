import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPIApprovalGetAllRequest, IKPIApprovalGetByIdRequest, IKPIApprovalPostRequest } from '@kpi/classes/queries';
import { IKPIEmployee, IKPIEmployeeDetail } from '@kpi/classes/response/employee';
import { action } from 'typesafe-actions';

export const enum KPIApprovalAction {
  GET_ALL_REQUEST = '@@kpi/approval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/approval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/approval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/approval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/approval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/approval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/approval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/approval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@kpi/approval/POST_REQUEST',
  POST_SUCCESS = '@@kpi/approval/POST_SUCCESS',
  POST_ERROR = '@@kpi/approval/POST_ERROR',
  POST_DISPOSE = '@@kpi/approval/POST_DISPOSE',
}

// get all
export const KPIApprovalGetAllRequest = (request: IKPIApprovalGetAllRequest) => action(KPIApprovalAction.GET_ALL_REQUEST, request);
export const KPIApprovalGetAllSuccess = (response: IResponseCollection<IKPIEmployee>) => action(KPIApprovalAction.GET_ALL_SUCCESS, response);
export const KPIApprovalGetAllError = (error: any) => action(KPIApprovalAction.GET_ALL_ERROR, error);
export const KPIApprovalGetAllDispose = () => action(KPIApprovalAction.GET_ALL_DISPOSE);

// get by id
export const KPIApprovalGetByIdRequest = (request: IKPIApprovalGetByIdRequest) => action(KPIApprovalAction.GET_BY_ID_REQUEST, request);
export const KPIApprovalGetByIdSuccess = (response: IResponseSingle<IKPIEmployeeDetail>) => action(KPIApprovalAction.GET_BY_ID_SUCCESS, response);
export const KPIApprovalGetByIdError = (error: any) => action(KPIApprovalAction.GET_BY_ID_ERROR, error);
export const KPIApprovalGetByIdDispose = () => action(KPIApprovalAction.GET_BY_ID_DISPOSE);

// post
export const KPIApprovalPostRequest = (request: IKPIApprovalPostRequest) => action(KPIApprovalAction.POST_REQUEST, request);
export const KPIApprovalPostSuccess = (response: IResponseCollection<IKPIEmployee>) => action(KPIApprovalAction.POST_SUCCESS, response);
export const KPIApprovalPostError = (error: any) => action(KPIApprovalAction.POST_ERROR, error);
export const KPIApprovalPostDispose = () => action(KPIApprovalAction.POST_DISPOSE);