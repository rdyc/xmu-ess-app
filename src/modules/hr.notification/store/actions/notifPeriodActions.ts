import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  INotifPeriodDeleteRequest, 
  INotifPeriodGetAllRequest, 
  INotifPeriodGetByIdRequest, 
  INotifPeriodPostRequest, 
  INotifPeriodPutRequest 
} from '@hr.notification/classes/queries/period';
import { INotifPeriod } from '@hr.notification/classes/response';
import { IProjectDetail } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum NotifPeriodAction {
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
export const notifPeriodGetAllRequest = (request: INotifPeriodGetAllRequest) => action(NotifPeriodAction.GET_ALL_REQUEST, request);
export const notifPeriodGetAllSuccess = (response: IResponseCollection<INotifPeriod>) => action(NotifPeriodAction.GET_ALL_SUCCESS, response);
export const notifPeriodGetAllError = (error: any) => action(NotifPeriodAction.GET_ALL_ERROR, error);
export const notifPeriodGetAllDispose = () => action(NotifPeriodAction.GET_ALL_DISPOSE);

// get by id
export const notifPeriodGetByIdRequest = (request: INotifPeriodGetByIdRequest) => action(NotifPeriodAction.GET_BY_ID_REQUEST, request);
export const notifPeriodGetByIdSuccess = (response: IResponseSingle<IProjectDetail>) => action(NotifPeriodAction.GET_BY_ID_SUCCESS, response);
export const notifPeriodGetByIdError = (error: any) => action(NotifPeriodAction.GET_BY_ID_ERROR, error);
export const notifPeriodGetByIdDispose = () => action(NotifPeriodAction.GET_BY_ID_DISPOSE);

// post
export const notifPeriodPostRequest = (request: INotifPeriodPostRequest) => action(NotifPeriodAction.POST_REQUEST, request);
export const notifPeriodPostSuccess = (response: IResponseSingle<INotifPeriod>) => action(NotifPeriodAction.POST_SUCCESS, response);
export const notifPeriodPostError = (error: any) => action(NotifPeriodAction.POST_ERROR, error);
export const notifPeriodPostDispose = () => action(NotifPeriodAction.POST_DISPOSE);

// put
export const notifPeriodPutRequest = (request: INotifPeriodPutRequest) => action(NotifPeriodAction.PUT_REQUEST, request);
export const notifPeriodPutSuccess = (response: IResponseSingle<INotifPeriod>) => action(NotifPeriodAction.PUT_SUCCESS, response);
export const notifPeriodPutError = (error: any) => action(NotifPeriodAction.PUT_ERROR, error);
export const notifPeriodPutDispose = () => action(NotifPeriodAction.PUT_DISPOSE);

// delete
export const notifPeriodDeleteRequest = (request: INotifPeriodDeleteRequest) => action(NotifPeriodAction.DELETE_REQUEST, request);
export const notifPeriodDeleteSuccess = (response: IResponseSingle<undefined>) => action(NotifPeriodAction.DELETE_SUCCESS, response);
export const notifPeriodDeleteError = (error: any) => action(NotifPeriodAction.DELETE_ERROR, error);
export const notifPeriodDeleteDispose = () => action(NotifPeriodAction.DELETE_DISPOSE);