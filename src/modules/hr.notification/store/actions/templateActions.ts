import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  ITemplateDeleteRequest, 
  ITemplateGetAllRequest, 
  ITemplateGetByIdRequest, 
  ITemplateGetListRequest, 
  ITemplatePostRequest, 
  ITemplatePutRequest
} from '@hr.notification/classes/queries/template';
import { ITemplate, ITemplateDetail } from '@hr.notification/classes/response';
import { action } from 'typesafe-actions';

export const enum TemplateAction {
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
export const templateGetAllRequest = (request: ITemplateGetAllRequest) => action(TemplateAction.GET_ALL_REQUEST, request);
export const templateGetAllSuccess = (response: IResponseCollection<ITemplate>) => action(TemplateAction.GET_ALL_SUCCESS, response);
export const templateGetAllError = (error: any) => action(TemplateAction.GET_ALL_ERROR, error);
export const templateGetAllDispose = () => action(TemplateAction.GET_ALL_DISPOSE);

// get list
export const templateGetListRequest = (request: ITemplateGetListRequest) => action(TemplateAction.GET_LIST_REQUEST, request);
export const templateGetListSuccess = (response: IResponseCollection<ITemplate>) => action(TemplateAction.GET_LIST_SUCCESS, response);
export const templateGetListError = (error: any) => action(TemplateAction.GET_LIST_ERROR, error);
export const templateGetListDispose = () => action(TemplateAction.GET_LIST_DISPOSE);

// get by id
export const templateGetByIdRequest = (request: ITemplateGetByIdRequest) => action(TemplateAction.GET_BY_ID_REQUEST, request);
export const templateGetByIdSuccess = (response: IResponseSingle<ITemplateDetail>) => action(TemplateAction.GET_BY_ID_SUCCESS, response);
export const templateGetByIdError = (error: any) => action(TemplateAction.GET_BY_ID_ERROR, error);
export const templateGetByIdDispose = () => action(TemplateAction.GET_BY_ID_DISPOSE);

// post
export const templatePostRequest = (request: ITemplatePostRequest) => action(TemplateAction.POST_REQUEST, request);
export const templatePostSuccess = (response: IResponseSingle<ITemplate>) => action(TemplateAction.POST_SUCCESS, response);
export const templatePostError = (error: any) => action(TemplateAction.POST_ERROR, error);
export const templatePostDispose = () => action(TemplateAction.POST_DISPOSE);

// put
export const templatePutRequest = (request: ITemplatePutRequest) => action(TemplateAction.PUT_REQUEST, request);
export const templatePutSuccess = (response: IResponseSingle<ITemplate>) => action(TemplateAction.PUT_SUCCESS, response);
export const templatePutError = (error: any) => action(TemplateAction.PUT_ERROR, error);
export const templatePutDispose = () => action(TemplateAction.PUT_DISPOSE);

// delete
export const templateDeleteRequest = (request: ITemplateDeleteRequest) => action(TemplateAction.DELETE_REQUEST, request);
export const templateDeleteSuccess = (response: IResponseSingle<undefined>) => action(TemplateAction.DELETE_SUCCESS, response);
export const templateDeleteError = (error: any) => action(TemplateAction.DELETE_ERROR, error);
export const templateDeleteDispose = () => action(TemplateAction.DELETE_DISPOSE);