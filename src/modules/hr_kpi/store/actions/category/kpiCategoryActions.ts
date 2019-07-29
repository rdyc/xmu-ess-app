import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPIMeasurementDeleteRequest, IKPIMeasurementGetAllRequest, IKPIMeasurementGetDetailRequest, IKPIMeasurementGetListRequest, IKPIMeasurementPostRequest, IKPIMeasurementPutRequest } from '@kpi/classes/queries/measurement';
import { IKPIMeasurement, IKPIMeasurementDetail, IKPIMeasurementList } from '@kpi/classes/response/measurement';
import { action } from 'typesafe-actions';

export const enum KPIMeasurementAction {
  GET_ALL_REQUEST = '@@KPI/measurement/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@KPI/measurement/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@KPI/measurement/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@KPI/measurement/GET_ALL_DISPOSE',
  GET_BYCATEGORY_REQUEST = '@@KPI/measurement/GET_BYCATEGORY_REQUEST',
  GET_BYCATEGORY_SUCCESS = '@@KPI/measurement/GET_BYCATEGORY_SUCCESS',
  GET_BYCATEGORY_ERROR = '@@KPI/measurement/GET_BYCATEGORY_ERROR',
  GET_BYCATEGORY_DISPOSE = '@@KPI/measurement/GET_BYCATEGORY_DISPOSE',
  GET_LIST_REQUEST = '@@KPI/measurement/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@KPI/measurement/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@KPI/measurement/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@KPI/measurement/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@KPI/measurement/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@KPI/measurement/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@KPI/measurement/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@KPI/measurement/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@KPI/measurement/POST_REQUEST',
  POST_SUCCESS = '@@KPI/measurement/POST_SUCCESS',
  POST_ERROR = '@@KPI/measurement/POST_ERROR',
  POST_DISPOSE = '@@KPI/measurement/POST_DISPOSE',
  PUT_REQUEST = '@@KPI/measurement/PUT_REQUEST',
  PUT_SUCCESS = '@@KPI/measurement/PUT_SUCCESS',
  PUT_ERROR = '@@KPI/measurement/PUT_ERROR',
  PUT_DISPOSE = '@@KPI/measurement/DELETE_DISPOSE',
  DELETE_REQUEST = '@@KPI/measurement/DELETE_REQUEST',
  DELETE_SUCCESS = '@@KPI/measurement/DELETE_SUCCESS',
  DELETE_ERROR = '@@KPI/measurement/DELETE_ERROR',
  DELETE_DISPOSE = '@@KPI/measurement/DELETE_DISPOSE',
}

// get all
export const KPIMeasurementGetAllRequest = (request: IKPIMeasurementGetAllRequest) => action(KPIMeasurementAction.GET_ALL_REQUEST, request);
export const KPIMeasurementGetAllSuccess = (response: IResponseCollection<IKPIMeasurement>) => action(KPIMeasurementAction.GET_ALL_SUCCESS, response);
export const KPIMeasurementGetAllError = (error: any) => action(KPIMeasurementAction.GET_ALL_ERROR, error);
export const KPIMeasurementGetAllDispose = () => action(KPIMeasurementAction.GET_ALL_DISPOSE);

// get list
export const KPIMeasurementGetListRequest = (request: IKPIMeasurementGetListRequest) => action(KPIMeasurementAction.GET_LIST_REQUEST, request);
export const KPIMeasurementGetListSuccess = (response: IResponseCollection<IKPIMeasurementList>) => action(KPIMeasurementAction.GET_LIST_SUCCESS, response);
export const KPIMeasurementGetListError = (error: any) => action(KPIMeasurementAction.GET_LIST_ERROR, error);
export const KPIMeasurementGetListDispose = () => action(KPIMeasurementAction.GET_LIST_DISPOSE);

// get by id
export const KPIMeasurementGetByIdRequest = (request: IKPIMeasurementGetDetailRequest) => action(KPIMeasurementAction.GET_BY_ID_REQUEST, request);
export const KPIMeasurementGetByIdSuccess = (response: IResponseSingle<IKPIMeasurementDetail>) => action(KPIMeasurementAction.GET_BY_ID_SUCCESS, response);
export const KPIMeasurementGetByIdError = (error: any) => action(KPIMeasurementAction.GET_BY_ID_ERROR, error);
export const KPIMeasurementGetByIdDispose = () => action(KPIMeasurementAction.GET_BY_ID_DISPOSE);

// post
export const KPIMeasurementPostRequest = (request: IKPIMeasurementPostRequest) => action(KPIMeasurementAction.POST_REQUEST, request);
export const KPIMeasurementPostSuccess = (response: IResponseSingle<IKPIMeasurement>) => action(KPIMeasurementAction.POST_SUCCESS, response);
export const KPIMeasurementPostError = (error: any) => action(KPIMeasurementAction.POST_ERROR, error);
export const KPIMeasurementPostDispose = () => action(KPIMeasurementAction.POST_DISPOSE);

// put
export const KPIMeasurementPutRequest = (request: IKPIMeasurementPutRequest) => action(KPIMeasurementAction.PUT_REQUEST, request);
export const KPIMeasurementPutSuccess = (response: IResponseSingle<IKPIMeasurement>) => action(KPIMeasurementAction.PUT_SUCCESS, response);
export const KPIMeasurementPutError = (error: any) => action(KPIMeasurementAction.PUT_ERROR, error);
export const KPIMeasurementPutDispose = () => action(KPIMeasurementAction.PUT_DISPOSE);

// delete
export const KPIMeasurementDeleteRequest = (request: IKPIMeasurementDeleteRequest) => action(KPIMeasurementAction.DELETE_REQUEST, request);
export const KPIMeasurementDeleteSuccess = (response: boolean) => action(KPIMeasurementAction.DELETE_SUCCESS, response);
export const KPIMeasurementDeleteError = (error: any) => action(KPIMeasurementAction.DELETE_ERROR, error);
export const KPIMeasurementDeleteDispose = () => action(KPIMeasurementAction.DELETE_DISPOSE);