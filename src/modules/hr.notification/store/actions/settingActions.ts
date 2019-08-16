import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  ISettingDeleteRequest, 
  ISettingGetAllRequest, 
  ISettingGetByIdRequest, 
  ISettingPostRequest, 
  ISettingPutRequest 
} from '@hr.notification/classes/queries/setting';
import { ISetting, ISettingDetail } from '@hr.notification/classes/response';
import { action } from 'typesafe-actions';

export const enum SettingAction {
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
export const settingGetAllRequest = (request: ISettingGetAllRequest) => action(SettingAction.GET_ALL_REQUEST, request);
export const settingGetAllSuccess = (response: IResponseCollection<ISetting>) => action(SettingAction.GET_ALL_SUCCESS, response);
export const settingGetAllError = (error: any) => action(SettingAction.GET_ALL_ERROR, error);
export const settingGetAllDispose = () => action(SettingAction.GET_ALL_DISPOSE);

// get by id
export const settingGetByIdRequest = (request: ISettingGetByIdRequest) => action(SettingAction.GET_BY_ID_REQUEST, request);
export const settingGetByIdSuccess = (response: IResponseSingle<ISettingDetail>) => action(SettingAction.GET_BY_ID_SUCCESS, response);
export const settingGetByIdError = (error: any) => action(SettingAction.GET_BY_ID_ERROR, error);
export const settingGetByIdDispose = () => action(SettingAction.GET_BY_ID_DISPOSE);

// post
export const settingPostRequest = (request: ISettingPostRequest) => action(SettingAction.POST_REQUEST, request);
export const settingPostSuccess = (response: IResponseSingle<ISetting>) => action(SettingAction.POST_SUCCESS, response);
export const settingPostError = (error: any) => action(SettingAction.POST_ERROR, error);
export const settingPostDispose = () => action(SettingAction.POST_DISPOSE);

// put
export const settingPutRequest = (request: ISettingPutRequest) => action(SettingAction.PUT_REQUEST, request);
export const settingPutSuccess = (response: IResponseSingle<ISetting>) => action(SettingAction.PUT_SUCCESS, response);
export const settingPutError = (error: any) => action(SettingAction.PUT_ERROR, error);
export const settingPutDispose = () => action(SettingAction.PUT_DISPOSE);

// delete
export const settingDeleteRequest = (request: ISettingDeleteRequest) => action(SettingAction.DELETE_REQUEST, request);
export const settingDeleteSuccess = (response: IResponseSingle<undefined>) => action(SettingAction.DELETE_SUCCESS, response);
export const settingDeleteError = (error: any) => action(SettingAction.DELETE_ERROR, error);
export const settingDeleteDispose = () => action(SettingAction.DELETE_DISPOSE);