import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IHRTemplateGetAllRequest, IHRTemplateGetByIdRequest, IHRTemplatePostRequest, IHRTemplatePutRequest } from '@hr/classes/queries';
import { IHRTemplate, IHRTemplateDetail } from '@hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HRTemplateAction {
  GET_ALL_REQUEST = '@@hr/template/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/template/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/template/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/template/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/template/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/template/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/template/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/template/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/template/POST_REQUEST',
  POST_SUCCESS = '@@hr/template/POST_SUCCESS',
  POST_ERROR = '@@hr/template/POST_ERROR',
  POST_DISPOSE = '@@hr/template/POST_DISPOSE',
  PUT_REQUEST = '@@hr/template/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/template/PUT_SUCCESS',
  PUT_ERROR = '@@hr/template/PUT_ERROR',
  PUT_DISPOSE = '@@hr/template/PUT_DISPOSE'
}

// get all
export const hrTemplateGetAllRequest = (request: IHRTemplateGetAllRequest) => action(HRTemplateAction.GET_ALL_REQUEST, request);
export const hrTemplateGetAllSuccess = (response: IResponseCollection<IHRTemplate>) => action(HRTemplateAction.GET_ALL_SUCCESS, response);
export const hrTemplateGetAllError = (error: any) => action(HRTemplateAction.GET_ALL_ERROR, error);
export const hrTemplateGetAllDispose = () => action(HRTemplateAction.GET_ALL_DISPOSE);

// get by id
export const hrTemplateGetByIdRequest = (request: IHRTemplateGetByIdRequest) => action(HRTemplateAction.GET_BY_ID_REQUEST, request);
export const hrTemplateGetByIdSuccess = (response: IResponseSingle<IHRTemplateDetail>) => action(HRTemplateAction.GET_BY_ID_SUCCESS, response);
export const hrTemplateGetByIdError = (error: any) => action(HRTemplateAction.GET_BY_ID_ERROR, error);
export const hrTemplateGetByIdDispose = () => action(HRTemplateAction.GET_BY_ID_DISPOSE);

// post
export const hrTemplatePostRequest = (request: IHRTemplatePostRequest) => action(HRTemplateAction.POST_REQUEST, request);
export const hrTemplatePostSuccess = (response: IResponseSingle<IHRTemplate>) => action(HRTemplateAction.POST_SUCCESS, response);
export const hrTemplatePostError = (error: any) => action(HRTemplateAction.POST_ERROR, error);
export const hrTemplatePostDispose = () => action(HRTemplateAction.POST_DISPOSE);

// put
export const hrTemplatePutRequest = (request: IHRTemplatePutRequest) => action(HRTemplateAction.PUT_REQUEST, request);
export const hrTemplatePutSuccess = (response: IResponseSingle<IHRTemplate>) => action(HRTemplateAction.PUT_SUCCESS, response);
export const hrTemplatePutError = (error: any) => action(HRTemplateAction.PUT_ERROR, error);
export const hrTemplatePutDispose = () => action(HRTemplateAction.PUT_DISPOSE);