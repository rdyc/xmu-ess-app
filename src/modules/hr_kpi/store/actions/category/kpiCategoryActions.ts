import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPICategoryGetAllRequest, IKPICategoryGetDetailRequest, IKPICategoryGetListRequest, IKPICategoryMeasurementPostRequest, IKPICategoryPostRequest, IKPICategoryPutRequest } from '@kpi/classes/queries/category';
import { IKPICategory, IKPICategoryDetail, IKPICategoryList } from '@kpi/classes/response/category';
import { action } from 'typesafe-actions';

export const enum KPICategoryAction {
  GET_ALL_REQUEST = '@@kpi/category/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/category/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/category/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/category/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@kpi/category/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@kpi/category/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@kpi/category/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@kpi/category/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/category/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/category/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/category/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/category/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@kpi/category/POST_REQUEST',
  POST_SUCCESS = '@@kpi/category/POST_SUCCESS',
  POST_ERROR = '@@kpi/category/POST_ERROR',
  POST_DISPOSE = '@@kpi/category/POST_DISPOSE',
  MEASUREMENT_POST_REQUEST = '@@kpi/category/MEASUREMENT_POST_REQUEST',
  MEASUREMENT_POST_SUCCESS = '@@kpi/category/MEASUREMENT_POST_SUCCESS',
  MEASUREMENT_POST_ERROR = '@@kpi/category/MEASUREMENT_POST_ERROR',
  MEASUREMENT_POST_DISPOSE = '@@kpi/category/MEASUREMENT_POST_DISPOSE',
  PUT_REQUEST = '@@kpi/category/PUT_REQUEST',
  PUT_SUCCESS = '@@kpi/category/PUT_SUCCESS',
  PUT_ERROR = '@@kpi/category/PUT_ERROR',
  PUT_DISPOSE = '@@kpi/category/DELETE_DISPOSE',
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

// post measurement
export const KPICategoryMeasurementPostRequest = (request: IKPICategoryMeasurementPostRequest) => action(KPICategoryAction.MEASUREMENT_POST_REQUEST, request);
export const KPICategoryMeasurementPostSuccess = (response: IResponseSingle<IKPICategory>) => action(KPICategoryAction.MEASUREMENT_POST_SUCCESS, response);
export const KPICategoryMeasurementPostError = (error: any) => action(KPICategoryAction.MEASUREMENT_POST_ERROR, error);
export const KPICategoryMeasurementPostDispose = () => action(KPICategoryAction.MEASUREMENT_POST_DISPOSE);

// put
export const KPICategoryPutRequest = (request: IKPICategoryPutRequest) => action(KPICategoryAction.PUT_REQUEST, request);
export const KPICategoryPutSuccess = (response: IResponseSingle<IKPICategory>) => action(KPICategoryAction.PUT_SUCCESS, response);
export const KPICategoryPutError = (error: any) => action(KPICategoryAction.PUT_ERROR, error);
export const KPICategoryPutDispose = () => action(KPICategoryAction.PUT_DISPOSE);