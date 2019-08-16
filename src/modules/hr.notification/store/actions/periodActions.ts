import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IPeriodDeleteRequest, 
  IPeriodGetAllRequest, 
  IPeriodGetByIdRequest, 
  IPeriodPostRequest, 
  IPeriodPutRequest 
} from '@hr.notification/classes/queries/period';
import { IPeriod } from '@hr.notification/classes/response';
import { IProjectDetail } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum PeriodAction {
  GET_ALL_REQUEST = '@@hr.notif/period/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr.notif/period/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr.notif/period/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr.notif/period/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr.notif/period/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr.notif/period/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr.notif/period/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr.notif/period/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr.notif/period/POST_REQUEST',
  POST_SUCCESS = '@@hr.notif/period/POST_SUCCESS',
  POST_ERROR = '@@hr.notif/period/POST_ERROR',
  POST_DISPOSE = '@@hr.notif/period/POST_DISPOSE',
  PUT_REQUEST = '@@hr.notif/period/PUT_REQUEST',
  PUT_SUCCESS = '@@hr.notif/period/PUT_SUCCESS',
  PUT_ERROR = '@@hr.notif/period/PUT_ERROR',
  PUT_DISPOSE = '@@hr.notif/period/PUT_DISPOSE',
  DELETE_REQUEST = '@@hr.notif/period/DELETE_REQUEST',
  DELETE_SUCCESS = '@@hr.notif/period/DELETE_SUCCESS',
  DELETE_ERROR = '@@hr.notif/period/DELETE_ERROR',
  DELETE_DISPOSE = '@@hr.notif/period/DELETE_DISPOSE'
}

// get all
export const periodGetAllRequest = (request: IPeriodGetAllRequest) => action(PeriodAction.GET_ALL_REQUEST, request);
export const periodGetAllSuccess = (response: IResponseCollection<IPeriod>) => action(PeriodAction.GET_ALL_SUCCESS, response);
export const periodGetAllError = (error: any) => action(PeriodAction.GET_ALL_ERROR, error);
export const periodGetAllDispose = () => action(PeriodAction.GET_ALL_DISPOSE);

// get by id
export const periodGetByIdRequest = (request: IPeriodGetByIdRequest) => action(PeriodAction.GET_BY_ID_REQUEST, request);
export const periodGetByIdSuccess = (response: IResponseSingle<IProjectDetail>) => action(PeriodAction.GET_BY_ID_SUCCESS, response);
export const periodGetByIdError = (error: any) => action(PeriodAction.GET_BY_ID_ERROR, error);
export const periodGetByIdDispose = () => action(PeriodAction.GET_BY_ID_DISPOSE);

// post
export const periodPostRequest = (request: IPeriodPostRequest) => action(PeriodAction.POST_REQUEST, request);
export const periodPostSuccess = (response: IResponseSingle<IPeriod>) => action(PeriodAction.POST_SUCCESS, response);
export const periodPostError = (error: any) => action(PeriodAction.POST_ERROR, error);
export const periodPostDispose = () => action(PeriodAction.POST_DISPOSE);

// put
export const periodPutRequest = (request: IPeriodPutRequest) => action(PeriodAction.PUT_REQUEST, request);
export const periodPutSuccess = (response: IResponseSingle<IPeriod>) => action(PeriodAction.PUT_SUCCESS, response);
export const periodPutError = (error: any) => action(PeriodAction.PUT_ERROR, error);
export const periodPutDispose = () => action(PeriodAction.PUT_DISPOSE);

// delete
export const periodDeleteRequest = (request: IPeriodDeleteRequest) => action(PeriodAction.DELETE_REQUEST, request);
export const periodDeleteSuccess = (response: IResponseSingle<undefined>) => action(PeriodAction.DELETE_SUCCESS, response);
export const periodDeleteError = (error: any) => action(PeriodAction.DELETE_ERROR, error);
export const periodDeleteDispose = () => action(PeriodAction.DELETE_DISPOSE);