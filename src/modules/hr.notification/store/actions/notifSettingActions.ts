import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  INotifSettingDeleteRequest, 
  INotifSettingGetAllRequest, 
  INotifSettingGetByIdRequest, 
  INotifSettingPostRequest, 
  INotifSettingPutRequest 
} from '@hr.notification/classes/queries/setting';
import { INotifSetting, INotifSettingDetail } from '@hr.notification/classes/response';
import { action } from 'typesafe-actions';

export const enum NotifSettingAction {
  GET_ALL_REQUEST = '@@hr.notif/setting/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr.notif/setting/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr.notif/setting/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr.notif/setting/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr.notif/setting/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr.notif/setting/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr.notif/setting/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr.notif/setting/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr.notif/setting/POST_REQUEST',
  POST_SUCCESS = '@@hr.notif/setting/POST_SUCCESS',
  POST_ERROR = '@@hr.notif/setting/POST_ERROR',
  POST_DISPOSE = '@@hr.notif/setting/POST_DISPOSE',
  PUT_REQUEST = '@@hr.notif/setting/PUT_REQUEST',
  PUT_SUCCESS = '@@hr.notif/setting/PUT_SUCCESS',
  PUT_ERROR = '@@hr.notif/setting/PUT_ERROR',
  PUT_DISPOSE = '@@hr.notif/setting/PUT_DISPOSE',
  DELETE_REQUEST = '@@hr.notif/setting/DELETE_REQUEST',
  DELETE_SUCCESS = '@@hr.notif/setting/DELETE_SUCCESS',
  DELETE_ERROR = '@@hr.notif/setting/DELETE_ERROR',
  DELETE_DISPOSE = '@@hr.notif/setting/DELETE_DISPOSE'
}

// get all
export const notifSettingGetAllRequest = (request: INotifSettingGetAllRequest) => action(NotifSettingAction.GET_ALL_REQUEST, request);
export const notifSettingGetAllSuccess = (response: IResponseCollection<INotifSetting>) => action(NotifSettingAction.GET_ALL_SUCCESS, response);
export const notifSettingGetAllError = (error: any) => action(NotifSettingAction.GET_ALL_ERROR, error);
export const notifSettingGetAllDispose = () => action(NotifSettingAction.GET_ALL_DISPOSE);

// get by id
export const notifSettingGetByIdRequest = (request: INotifSettingGetByIdRequest) => action(NotifSettingAction.GET_BY_ID_REQUEST, request);
export const notifSettingGetByIdSuccess = (response: IResponseSingle<INotifSettingDetail>) => action(NotifSettingAction.GET_BY_ID_SUCCESS, response);
export const notifSettingGetByIdError = (error: any) => action(NotifSettingAction.GET_BY_ID_ERROR, error);
export const notifSettingGetByIdDispose = () => action(NotifSettingAction.GET_BY_ID_DISPOSE);

// post
export const notifSettingPostRequest = (request: INotifSettingPostRequest) => action(NotifSettingAction.POST_REQUEST, request);
export const notifSettingPostSuccess = (response: IResponseSingle<INotifSetting>) => action(NotifSettingAction.POST_SUCCESS, response);
export const notifSettingPostError = (error: any) => action(NotifSettingAction.POST_ERROR, error);
export const notifSettingPostDispose = () => action(NotifSettingAction.POST_DISPOSE);

// put
export const notifSettingPutRequest = (request: INotifSettingPutRequest) => action(NotifSettingAction.PUT_REQUEST, request);
export const notifSettingPutSuccess = (response: IResponseSingle<INotifSetting>) => action(NotifSettingAction.PUT_SUCCESS, response);
export const notifSettingPutError = (error: any) => action(NotifSettingAction.PUT_ERROR, error);
export const notifSettingPutDispose = () => action(NotifSettingAction.PUT_DISPOSE);

// delete
export const notifSettingDeleteRequest = (request: INotifSettingDeleteRequest) => action(NotifSettingAction.DELETE_REQUEST, request);
export const notifSettingDeleteSuccess = (response: IResponseSingle<undefined>) => action(NotifSettingAction.DELETE_SUCCESS, response);
export const notifSettingDeleteError = (error: any) => action(NotifSettingAction.DELETE_ERROR, error);
export const notifSettingDeleteDispose = () => action(NotifSettingAction.DELETE_DISPOSE);