import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPIOpenGetAllRequest, IKPIOpenGetDetailRequest, IKPIOpenPostRequest, IKPIOpenPutRequest } from '@kpi/classes/queries/open';
import { IKPIOpen, IKPIOpenDetail } from '@kpi/classes/response/open';
import { action } from 'typesafe-actions';

export const enum KPIOpenAction {
  GET_ALL_REQUEST = '@@kpi/open/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/open/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/open/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/open/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/open/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/open/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/open/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/open/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@kpi/open/POST_REQUEST',
  POST_SUCCESS = '@@kpi/open/POST_SUCCESS',
  POST_ERROR = '@@kpi/open/POST_ERROR',
  POST_DISPOSE = '@@kpi/open/POST_DISPOSE',
  PUT_REQUEST = '@@kpi/open/PUT_REQUEST',
  PUT_SUCCESS = '@@kpi/open/PUT_SUCCESS',
  PUT_ERROR = '@@kpi/open/PUT_ERROR',
  PUT_DISPOSE = '@@kpi/open/DELETE_DISPOSE',
}

// get all
export const KPIOpenGetAllRequest = (request: IKPIOpenGetAllRequest) => action(KPIOpenAction.GET_ALL_REQUEST, request);
export const KPIOpenGetAllSuccess = (response: IResponseCollection<IKPIOpen>) => action(KPIOpenAction.GET_ALL_SUCCESS, response);
export const KPIOpenGetAllError = (error: any) => action(KPIOpenAction.GET_ALL_ERROR, error);
export const KPIOpenGetAllDispose = () => action(KPIOpenAction.GET_ALL_DISPOSE);

// get by id
export const KPIOpenGetByIdRequest = (request: IKPIOpenGetDetailRequest) => action(KPIOpenAction.GET_BY_ID_REQUEST, request);
export const KPIOpenGetByIdSuccess = (response: IResponseSingle<IKPIOpenDetail>) => action(KPIOpenAction.GET_BY_ID_SUCCESS, response);
export const KPIOpenGetByIdError = (error: any) => action(KPIOpenAction.GET_BY_ID_ERROR, error);
export const KPIOpenGetByIdDispose = () => action(KPIOpenAction.GET_BY_ID_DISPOSE);

// post
export const KPIOpenPostRequest = (request: IKPIOpenPostRequest) => action(KPIOpenAction.POST_REQUEST, request);
export const KPIOpenPostSuccess = (response: IResponseSingle<IKPIOpen>) => action(KPIOpenAction.POST_SUCCESS, response);
export const KPIOpenPostError = (error: any) => action(KPIOpenAction.POST_ERROR, error);
export const KPIOpenPostDispose = () => action(KPIOpenAction.POST_DISPOSE);

// put
export const KPIOpenPutRequest = (request: IKPIOpenPutRequest) => action(KPIOpenAction.PUT_REQUEST, request);
export const KPIOpenPutSuccess = (response: IResponseSingle<IKPIOpen>) => action(KPIOpenAction.PUT_SUCCESS, response);
export const KPIOpenPutError = (error: any) => action(KPIOpenAction.PUT_ERROR, error);
export const KPIOpenPutDispose = () => action(KPIOpenAction.PUT_DISPOSE);