import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  INotifTemplateDeleteRequest, 
  INotifTemplateGetAllRequest, 
  INotifTemplateGetByIdRequest, 
  INotifTemplateGetListRequest, 
  INotifTemplatePostRequest, 
  INotifTemplatePutRequest
} from '@hr.notification/classes/queries/template';
import { INotifTemplate, INotifTemplateDetail, INotifTemplateList } from '@hr.notification/classes/response';
import { action } from 'typesafe-actions';

export const enum NotifTemplateAction {
  GET_ALL_REQUEST = '@@hr.notif/template/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr.notif/template/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr.notif/template/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr.notif/template/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr.notif/template/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr.notif/template/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr.notif/template/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr.notif/template/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr.notif/template/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr.notif/template/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr.notif/template/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr.notif/template/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr.notif/template/POST_REQUEST',
  POST_SUCCESS = '@@hr.notif/template/POST_SUCCESS',
  POST_ERROR = '@@hr.notif/template/POST_ERROR',
  POST_DISPOSE = '@@hr.notif/template/POST_DISPOSE',
  PUT_REQUEST = '@@hr.notif/template/PUT_REQUEST',
  PUT_SUCCESS = '@@hr.notif/template/PUT_SUCCESS',
  PUT_ERROR = '@@hr.notif/template/PUT_ERROR',
  PUT_DISPOSE = '@@hr.notif/template/PUT_DISPOSE',
  DELETE_REQUEST = '@@hr.notif/template/DELETE_REQUEST',
  DELETE_SUCCESS = '@@hr.notif/template/DELETE_SUCCESS',
  DELETE_ERROR = '@@hr.notif/template/DELETE_ERROR',
  DELETE_DISPOSE = '@@hr.notif/template/DELETE_DISPOSE'
}

// get all
export const notifTemplateGetAllRequest = (request: INotifTemplateGetAllRequest) => action(NotifTemplateAction.GET_ALL_REQUEST, request);
export const notifTemplateGetAllSuccess = (response: IResponseCollection<INotifTemplate>) => action(NotifTemplateAction.GET_ALL_SUCCESS, response);
export const notifTemplateGetAllError = (error: any) => action(NotifTemplateAction.GET_ALL_ERROR, error);
export const notifTemplateGetAllDispose = () => action(NotifTemplateAction.GET_ALL_DISPOSE);

// get list
export const notifTemplateGetListRequest = (request: INotifTemplateGetListRequest) => action(NotifTemplateAction.GET_LIST_REQUEST, request);
export const notifTemplateGetListSuccess = (response: IResponseCollection<INotifTemplateList>) => action(NotifTemplateAction.GET_LIST_SUCCESS, response);
export const notifTemplateGetListError = (error: any) => action(NotifTemplateAction.GET_LIST_ERROR, error);
export const notifTemplateGetListDispose = () => action(NotifTemplateAction.GET_LIST_DISPOSE);

// get by id
export const notifTemplateGetByIdRequest = (request: INotifTemplateGetByIdRequest) => action(NotifTemplateAction.GET_BY_ID_REQUEST, request);
export const notifTemplateGetByIdSuccess = (response: IResponseSingle<INotifTemplateDetail>) => action(NotifTemplateAction.GET_BY_ID_SUCCESS, response);
export const notifTemplateGetByIdError = (error: any) => action(NotifTemplateAction.GET_BY_ID_ERROR, error);
export const notifTemplateGetByIdDispose = () => action(NotifTemplateAction.GET_BY_ID_DISPOSE);

// post
export const notifTemplatePostRequest = (request: INotifTemplatePostRequest) => action(NotifTemplateAction.POST_REQUEST, request);
export const notifTemplatePostSuccess = (response: IResponseSingle<INotifTemplate>) => action(NotifTemplateAction.POST_SUCCESS, response);
export const notifTemplatePostError = (error: any) => action(NotifTemplateAction.POST_ERROR, error);
export const notifTemplatePostDispose = () => action(NotifTemplateAction.POST_DISPOSE);

// put
export const notifTemplatePutRequest = (request: INotifTemplatePutRequest) => action(NotifTemplateAction.PUT_REQUEST, request);
export const notifTemplatePutSuccess = (response: IResponseSingle<INotifTemplate>) => action(NotifTemplateAction.PUT_SUCCESS, response);
export const notifTemplatePutError = (error: any) => action(NotifTemplateAction.PUT_ERROR, error);
export const notifTemplatePutDispose = () => action(NotifTemplateAction.PUT_DISPOSE);

// delete
export const notifTemplateDeleteRequest = (request: INotifTemplateDeleteRequest) => action(NotifTemplateAction.DELETE_REQUEST, request);
export const notifTemplateDeleteSuccess = () => action(NotifTemplateAction.DELETE_SUCCESS);
export const notifTemplateDeleteError = (error: any) => action(NotifTemplateAction.DELETE_ERROR, error);
export const notifTemplateDeleteDispose = () => action(NotifTemplateAction.DELETE_DISPOSE);