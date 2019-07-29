import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPICategoryGetAllRequest, IKPICategoryGetDetailRequest, IKPICategoryGetListRequest, IKPICategoryPostRequest, IKPICategoryPutRequest } from '@kpi/classes/queries/category';
import { IKPICategory, IKPICategoryDetail, IKPICategoryList } from '@kpi/classes/response/category';
import { action } from 'typesafe-actions';

export const enum KPICategoryAction {
  GET_ALL_REQUEST = '@@KPI/category/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@KPI/category/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@KPI/category/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@KPI/category/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@KPI/category/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@KPI/category/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@KPI/category/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@KPI/category/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@KPI/category/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@KPI/category/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@KPI/category/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@KPI/category/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@KPI/category/POST_REQUEST',
  POST_SUCCESS = '@@KPI/category/POST_SUCCESS',
  POST_ERROR = '@@KPI/category/POST_ERROR',
  POST_DISPOSE = '@@KPI/category/POST_DISPOSE',
  PUT_REQUEST = '@@KPI/category/PUT_REQUEST',
  PUT_SUCCESS = '@@KPI/category/PUT_SUCCESS',
  PUT_ERROR = '@@KPI/category/PUT_ERROR',
  PUT_DISPOSE = '@@KPI/category/DELETE_DISPOSE',
}

// get all
export const KPICategoryGetAllRequest = (request: IKPICategoryGetAllRequest) => action(KPICategoryAction.GET_ALL_REQUEST, request);
export const KPICategoryGetAllSuccess = (response: IResponseCollection<IKPICategory>) => action(KPICategoryAction.GET_ALL_SUCCESS, response);
export const KPICategoryGetAllError = (error: any) => action(KPICategoryAction.GET_ALL_ERROR, error);
export const KPICategoryGetAllDispose = () => action(KPICategoryAction.GET_ALL_DISPOSE);

// get list
export const KPICategoryGetListRequest = (request: IKPICategoryGetListRequest) => action(KPICategoryAction.GET_LIST_REQUEST, request);
export const KPICategoryGetListSuccess = (response: IResponseCollection<IKPICategoryList>) => action(KPICategoryAction.GET_LIST_SUCCESS, response);
export const KPICategoryGetListError = (error: any) => action(KPICategoryAction.GET_LIST_ERROR, error);
export const KPICategoryGetListDispose = () => action(KPICategoryAction.GET_LIST_DISPOSE);

// get by id
export const KPICategoryGetByIdRequest = (request: IKPICategoryGetDetailRequest) => action(KPICategoryAction.GET_BY_ID_REQUEST, request);
export const KPICategoryGetByIdSuccess = (response: IResponseSingle<IKPICategoryDetail>) => action(KPICategoryAction.GET_BY_ID_SUCCESS, response);
export const KPICategoryGetByIdError = (error: any) => action(KPICategoryAction.GET_BY_ID_ERROR, error);
export const KPICategoryGetByIdDispose = () => action(KPICategoryAction.GET_BY_ID_DISPOSE);

// post
export const KPICategoryPostRequest = (request: IKPICategoryPostRequest) => action(KPICategoryAction.POST_REQUEST, request);
export const KPICategoryPostSuccess = (response: IResponseSingle<IKPICategory>) => action(KPICategoryAction.POST_SUCCESS, response);
export const KPICategoryPostError = (error: any) => action(KPICategoryAction.POST_ERROR, error);
export const KPICategoryPostDispose = () => action(KPICategoryAction.POST_DISPOSE);

// put
export const KPICategoryPutRequest = (request: IKPICategoryPutRequest) => action(KPICategoryAction.PUT_REQUEST, request);
export const KPICategoryPutSuccess = (response: IResponseSingle<IKPICategory>) => action(KPICategoryAction.PUT_SUCCESS, response);
export const KPICategoryPutError = (error: any) => action(KPICategoryAction.PUT_ERROR, error);
export const KPICategoryPutDispose = () => action(KPICategoryAction.PUT_DISPOSE);