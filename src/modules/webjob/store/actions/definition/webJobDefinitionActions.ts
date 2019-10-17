import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IWebJobDefinitionDeleteRequest, 
  IWebJobDefinitionGetAllRequest,
  IWebJobDefinitionGetDetailRequest, 
  IWebJobDefinitionGetListRequest, 
  IWebJobDefinitionJobGetAllRequest, 
  IWebJobDefinitionJobGetListRequest, 
  IWebJobDefinitionPostRequest 
} from '@webjob/classes/queries';
import { 
  IWebJobDefinition, 
  IWebJobDefinitionDetail, 
  IWebJobDefinitionJob, 
  IWebJobDefinitionJobList, 
  IWebJobDefinitionList 
} from '@webjob/classes/response';
import { action } from 'typesafe-actions';

export const enum WebJobDefinitionAction {
  GET_ALL_REQUEST = '@@webjob/definition/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@webjob/definition/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@webjob/definition/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@webjob/definition/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@webjob/definition/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@webjob/definition/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@webjob/definition/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@webjob/definition/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@webjob/definition/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@webjob/definition/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@webjob/definition/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@webjob/definition/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@webjob/definition/POST_REQUEST',
  POST_SUCCESS = '@@webjob/definition/POST_SUCCESS',
  POST_ERROR = '@@webjob/definition/POST_ERROR',
  POST_DISPOSE = '@@webjob/definition/POST_DISPOSE',
  DELETE_REQUEST = '@@webjob/definition/DELETE_REQUEST',
  DELETE_SUCCESS = '@@webjob/definition/DELETE_SUCCESS',
  DELETE_ERROR = '@@webjob/definition/DELETE_ERROR',
  DELETE_DISPOSE = '@@webjob/definition/DELETE_DISPOSE',
  JOB_GET_ALL_REQUEST = '@@webjob/definition/JOB_GET_ALL_REQUEST',
  JOB_GET_ALL_SUCCESS = '@@webjob/definition/JOB_GET_ALL_SUCCESS',
  JOB_GET_ALL_ERROR = '@@webjob/definition/JOB_GET_ALL_ERROR',
  JOB_GET_ALL_DISPOSE = '@@webjob/definition/JOB_GET_ALL_DISPOSE',
  JOB_GET_LIST_REQUEST = '@@webjob/definition/JOB_GET_LIST_REQUEST',
  JOB_GET_LIST_SUCCESS = '@@webjob/definition/JOB_GET_LIST_SUCCESS',
  JOB_GET_LIST_ERROR = '@@webjob/definition/JOB_GET_LIST_ERROR',
  JOB_GET_LIST_DISPOSE = '@@webjob/definition/JOB_GET_LIST_DISPOSE',
}

// get all
export const webJobDefinitionGetAllRequest = (request: IWebJobDefinitionGetAllRequest) => action(WebJobDefinitionAction.GET_ALL_REQUEST, request);
export const webJobDefinitionGetAllSuccess = (response: IResponseCollection<IWebJobDefinition>) => action(WebJobDefinitionAction.GET_ALL_SUCCESS, response);
export const webJobDefinitionGetAllError = (error: any) => action(WebJobDefinitionAction.GET_ALL_ERROR, error);
export const webJobDefinitionGetAllDispose = () => action(WebJobDefinitionAction.GET_ALL_DISPOSE);

// get list
export const webJobDefinitionGetListRequest = (request: IWebJobDefinitionGetListRequest) => action(WebJobDefinitionAction.GET_LIST_REQUEST, request);
export const webJobDefinitionGetListSuccess = (response: IResponseCollection<IWebJobDefinitionList>) => action(WebJobDefinitionAction.GET_LIST_SUCCESS, response);
export const webJobDefinitionGetListError = (error: any) => action(WebJobDefinitionAction.GET_LIST_ERROR, error);
export const webJobDefinitionGetListDispose = () => action(WebJobDefinitionAction.GET_LIST_DISPOSE);

// get by id
export const webJobDefinitionGetByIdRequest = (request: IWebJobDefinitionGetDetailRequest) => action(WebJobDefinitionAction.GET_BY_ID_REQUEST, request);
export const webJobDefinitionGetByIdSuccess = (response: IResponseSingle<IWebJobDefinitionDetail>) => action(WebJobDefinitionAction.GET_BY_ID_SUCCESS, response);
export const webJobDefinitionGetByIdError = (error: any) => action(WebJobDefinitionAction.GET_BY_ID_ERROR, error);
export const webJobDefinitionGetByIdDispose = () => action(WebJobDefinitionAction.GET_BY_ID_DISPOSE);

// post
export const webJobDefinitionPostRequest = (request: IWebJobDefinitionPostRequest) => action(WebJobDefinitionAction.POST_REQUEST, request);
export const webJobDefinitionPostSuccess = (response: IResponseSingle<IWebJobDefinition>) => action(WebJobDefinitionAction.POST_SUCCESS, response);
export const webJobDefinitionPostError = (error: any) => action(WebJobDefinitionAction.POST_ERROR, error);
export const webJobDefinitionPostDispose = () => action(WebJobDefinitionAction.POST_DISPOSE);

// delete
export const webJobDefinitionDeleteRequest = (request: IWebJobDefinitionDeleteRequest) => action(WebJobDefinitionAction.DELETE_REQUEST, request);
export const webJobDefinitionDeleteSuccess = (response: boolean) => action(WebJobDefinitionAction.DELETE_SUCCESS, response);
export const webJobDefinitionDeleteError = (error: any) => action(WebJobDefinitionAction.DELETE_ERROR, error);
export const webJobDefinitionDeleteDispose = () => action(WebJobDefinitionAction.DELETE_DISPOSE);

// get all
export const webJobDefinitionJobGetAllRequest = (request: IWebJobDefinitionJobGetAllRequest) => action(WebJobDefinitionAction.JOB_GET_ALL_REQUEST, request);
export const webJobDefinitionJobGetAllSuccess = (response: IResponseCollection<IWebJobDefinitionJob>) => action(WebJobDefinitionAction.JOB_GET_ALL_SUCCESS, response);
export const webJobDefinitionJobGetAllError = (error: any) => action(WebJobDefinitionAction.JOB_GET_ALL_ERROR, error);
export const webJobDefinitionJobGetAllDispose = () => action(WebJobDefinitionAction.JOB_GET_ALL_DISPOSE);

// get list
export const webJobDefinitionJobGetListRequest = (request: IWebJobDefinitionJobGetListRequest) => action(WebJobDefinitionAction.JOB_GET_LIST_REQUEST, request);
export const webJobDefinitionJobGetListSuccess = (response: IResponseCollection<IWebJobDefinitionJobList>) => action(WebJobDefinitionAction.JOB_GET_LIST_SUCCESS, response);
export const webJobDefinitionJobGetListError = (error: any) => action(WebJobDefinitionAction.JOB_GET_LIST_ERROR, error);
export const webJobDefinitionJobGetListDispose = () => action(WebJobDefinitionAction.JOB_GET_LIST_DISPOSE);
