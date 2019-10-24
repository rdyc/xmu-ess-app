import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IKPITemplateGetAllRequest, IKPITemplateGetByIdRequest, IKPITemplateGetListRequest, IKPITemplatePostRequest, IKPITemplatePutRequest } from '@kpi/classes/queries/template';
import { IKPITemplate, IKPITemplateDetail } from '@kpi/classes/response/template';
import { action } from 'typesafe-actions';

export const enum KPITemplateAction {
  GET_ALL_REQUEST = '@@kpi/template/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/template/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/template/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/template/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@kpi/template/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@kpi/template/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@kpi/template/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@kpi/template/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/template/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/template/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/template/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/template/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@kpi/template/POST_REQUEST',
  POST_SUCCESS = '@@kpi/template/POST_SUCCESS',
  POST_ERROR = '@@kpi/template/POST_ERROR',
  POST_DISPOSE = '@@kpi/template/POST_DISPOSE',
  PUT_REQUEST = '@@kpi/template/PUT_REQUEST',
  PUT_SUCCESS = '@@kpi/template/PUT_SUCCESS',
  PUT_ERROR = '@@kpi/template/PUT_ERROR',
  PUT_DISPOSE = '@@kpi/template/PUT_DISPOSE'
}

// get all
export const KPITemplateGetAllRequest = (request: IKPITemplateGetAllRequest) => action(KPITemplateAction.GET_ALL_REQUEST, request);
export const KPITemplateGetAllSuccess = (response: IResponseCollection<IKPITemplate>) => action(KPITemplateAction.GET_ALL_SUCCESS, response);
export const KPITemplateGetAllError = (error: any) => action(KPITemplateAction.GET_ALL_ERROR, error);
export const KPITemplateGetAllDispose = () => action(KPITemplateAction.GET_ALL_DISPOSE);

// get list
export const KPITemplateGetListRequest = (request: IKPITemplateGetListRequest) => action(KPITemplateAction.GET_LIST_REQUEST, request);
export const KPITemplateGetListSuccess = (response: IResponseCollection<IKPITemplate>) => action(KPITemplateAction.GET_LIST_SUCCESS, response);
export const KPITemplateGetListError = (error: any) => action(KPITemplateAction.GET_LIST_ERROR, error);
export const KPITemplateGetListDispose = () => action(KPITemplateAction.GET_LIST_DISPOSE);

// get by id
export const KPITemplateGetByIdRequest = (request: IKPITemplateGetByIdRequest) => action(KPITemplateAction.GET_BY_ID_REQUEST, request);
export const KPITemplateGetByIdSuccess = (response: IResponseSingle<IKPITemplateDetail>) => action(KPITemplateAction.GET_BY_ID_SUCCESS, response);
export const KPITemplateGetByIdError = (error: any) => action(KPITemplateAction.GET_BY_ID_ERROR, error);
export const KPITemplateGetByIdDispose = () => action(KPITemplateAction.GET_BY_ID_DISPOSE);

// post
export const KPITemplatePostRequest = (request: IKPITemplatePostRequest) => action(KPITemplateAction.POST_REQUEST, request);
export const KPITemplatePostSuccess = (response: IResponseSingle<IKPITemplate>) => action(KPITemplateAction.POST_SUCCESS, response);
export const KPITemplatePostError = (error: any) => action(KPITemplateAction.POST_ERROR, error);
export const KPITemplatePostDispose = () => action(KPITemplateAction.POST_DISPOSE);

// put
export const KPITemplatePutRequest = (request: IKPITemplatePutRequest) => action(KPITemplateAction.PUT_REQUEST, request);
export const KPITemplatePutSuccess = (response: IResponseSingle<IKPITemplate>) => action(KPITemplateAction.PUT_SUCCESS, response);
export const KPITemplatePutError = (error: any) => action(KPITemplateAction.PUT_ERROR, error);
export const KPITemplatePutDispose = () => action(KPITemplateAction.PUT_DISPOSE);