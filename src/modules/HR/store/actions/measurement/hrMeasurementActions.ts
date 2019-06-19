import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IHRMeasurementDeleteRequest, IHRMeasurementGetAllRequest, IHRMeasurementGetDetailRequest, IHRMeasurementGetListRequest, IHRMeasurementPostRequest, IHRMeasurementPutRequest } from 'modules/HR/classes/queries/measurement';
import { IHRMeasurement, IHRMeasurementDetail, IHRMeasurementList } from 'modules/HR/classes/response/measurement';
import { action } from 'typesafe-actions';

export const enum HRMeasurementAction {
  GET_ALL_REQUEST = '@@HR/measurement/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@HR/measurement/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@HR/measurement/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@HR/measurement/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@HR/measurement/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@HR/measurement/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@HR/measurement/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@HR/measurement/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@HR/measurement/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@HR/measurement/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@HR/measurement/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@HR/measurement/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@HR/measurement/POST_REQUEST',
  POST_SUCCESS = '@@HR/measurement/POST_SUCCESS',
  POST_ERROR = '@@HR/measurement/POST_ERROR',
  POST_DISPOSE = '@@HR/measurement/POST_DISPOSE',
  PUT_REQUEST = '@@HR/measurement/PUT_REQUEST',
  PUT_SUCCESS = '@@HR/measurement/PUT_SUCCESS',
  PUT_ERROR = '@@HR/measurement/PUT_ERROR',
  PUT_DISPOSE = '@@HR/measurement/DELETE_DISPOSE',
  DELETE_REQUEST = '@@HR/measurement/DELETE_REQUEST',
  DELETE_SUCCESS = '@@HR/measurement/DELETE_SUCCESS',
  DELETE_ERROR = '@@HR/measurement/DELETE_ERROR',
  DELETE_DISPOSE = '@@HR/measurement/DELETE_DISPOSE',
}

// get all
export const hrMeasurementGetAllRequest = (request: IHRMeasurementGetAllRequest) => action(HRMeasurementAction.GET_ALL_REQUEST, request);
export const hrMeasurementGetAllSuccess = (response: IResponseCollection<IHRMeasurement>) => action(HRMeasurementAction.GET_ALL_SUCCESS, response);
export const hrMeasurementGetAllError = (error: any) => action(HRMeasurementAction.GET_ALL_ERROR, error);
export const hrMeasurementGetAllDispose = () => action(HRMeasurementAction.GET_ALL_DISPOSE);

// get list
export const hrMeasurementGetListRequest = (request: IHRMeasurementGetListRequest) => action(HRMeasurementAction.GET_LIST_REQUEST, request);
export const hrMeasurementGetListSuccess = (response: IResponseCollection<IHRMeasurementList>) => action(HRMeasurementAction.GET_LIST_SUCCESS, response);
export const hrMeasurementGetListError = (error: any) => action(HRMeasurementAction.GET_LIST_ERROR, error);
export const hrMeasurementGetListDispose = () => action(HRMeasurementAction.GET_LIST_DISPOSE);

// get by id
export const hrMeasurementGetByIdRequest = (request: IHRMeasurementGetDetailRequest) => action(HRMeasurementAction.GET_BY_ID_REQUEST, request);
export const hrMeasurementGetByIdSuccess = (response: IResponseSingle<IHRMeasurementDetail>) => action(HRMeasurementAction.GET_BY_ID_SUCCESS, response);
export const hrMeasurementGetByIdError = (error: any) => action(HRMeasurementAction.GET_BY_ID_ERROR, error);
export const hrMeasurementGetByIdDispose = () => action(HRMeasurementAction.GET_BY_ID_DISPOSE);

// post
export const hrMeasurementPostRequest = (request: IHRMeasurementPostRequest) => action(HRMeasurementAction.POST_REQUEST, request);
export const hrMeasurementPostSuccess = (response: IResponseSingle<IHRMeasurement>) => action(HRMeasurementAction.POST_SUCCESS, response);
export const hrMeasurementPostError = (error: any) => action(HRMeasurementAction.POST_ERROR, error);
export const hrMeasurementPostDispose = () => action(HRMeasurementAction.POST_DISPOSE);

// put
export const hrMeasurementPutRequest = (request: IHRMeasurementPutRequest) => action(HRMeasurementAction.PUT_REQUEST, request);
export const hrMeasurementPutSuccess = (response: IResponseSingle<IHRMeasurement>) => action(HRMeasurementAction.PUT_SUCCESS, response);
export const hrMeasurementPutError = (error: any) => action(HRMeasurementAction.PUT_ERROR, error);
export const hrMeasurementPutDispose = () => action(HRMeasurementAction.PUT_DISPOSE);

// delete
export const hrMeasurementDeleteRequest = (request: IHRMeasurementDeleteRequest) => action(HRMeasurementAction.DELETE_REQUEST, request);
export const hrMeasurementDeleteSuccess = (response: boolean) => action(HRMeasurementAction.DELETE_SUCCESS, response);
export const hrMeasurementDeleteError = (error: any) => action(HRMeasurementAction.DELETE_ERROR, error);
export const hrMeasurementDeleteDispose = () => action(HRMeasurementAction.DELETE_DISPOSE);