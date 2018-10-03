import { IResponseCollection, IResponseList, IResponseSingle } from '@generic/interfaces';
import {
  IProjectGetAllRequest,
  IProjectGetByIdRequest,
  IProjectPostRequest,
  IProjectPutRequest,
} from '@project/classes/queries';
import { IProjectGetListRequest } from '@project/classes/queries/IProjectGetListRequest';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectAction {
  GET_ALL_REQUEST = '@@project/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@project/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@project/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@project/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@project/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@project/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@project/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@project/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@project/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@project/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@project/POST_REQUEST',
  POST_SUCCESS = '@@project/POST_SUCCESS',
  POST_ERROR = '@@project/POST_ERROR',
  POST_DISPOSE = '@@project/POST_DISPOSE',
  PUT_REQUEST = '@@project/PUT_REQUEST',
  PUT_SUCCESS = '@@project/PUT_SUCCESS',
  PUT_ERROR = '@@project/PUT_ERROR',
  PUT_DISPOSE = '@@project/PUT_DISPOSE',
}

// get all
export const projectGetAllRequest = (request: IProjectGetAllRequest) => action(ProjectAction.GET_ALL_REQUEST, request);
export const projectGetAllSuccess = (response: IResponseCollection<IProject>) => action(ProjectAction.GET_ALL_SUCCESS, response);
export const projectGetAllError = (message: string) => action(ProjectAction.GET_ALL_ERROR, message);
export const projectGetAllDispose = () => action(ProjectAction.GET_ALL_DISPOSE);

// get list
export const projectGetListRequest = (request: IProjectGetListRequest) => action(ProjectAction.GET_LIST_REQUEST, request);
export const projectGetListSuccess = (response: IResponseList<IProjectList>) => action(ProjectAction.GET_LIST_SUCCESS, response);
export const projectGetListError = (message: string) => action(ProjectAction.GET_LIST_ERROR, message);
export const projectGetListDispose = () => action(ProjectAction.GET_LIST_DISPOSE);

// get by id
export const projectGetByIdRequest = (request: IProjectGetByIdRequest) => action(ProjectAction.GET_BY_ID_REQUEST, request);
export const projectGetByIdSuccess = (response: IResponseSingle<IProjectDetail>) => action(ProjectAction.GET_BY_ID_SUCCESS, response);
export const projectGetByIdError = (message: string) => action(ProjectAction.GET_BY_ID_ERROR, message);
export const projectGetByIdDispose = () => action(ProjectAction.GET_BY_ID_DISPOSE);

// post
export const projectPostRequest = (request: IProjectPostRequest) => action(ProjectAction.POST_REQUEST, request);
export const projectPostSuccess = (response: IResponseSingle<IProject>) => action(ProjectAction.POST_SUCCESS, response);
export const projectPostError = (message: string) => action(ProjectAction.POST_ERROR, message);
export const projectPostDispose = () => action(ProjectAction.POST_DISPOSE);

// put
export const projectPutRequest = (request: IProjectPutRequest) => action(ProjectAction.PUT_REQUEST, request);
export const projectPutSuccess = (response: IResponseSingle<IProject>) => action(ProjectAction.PUT_SUCCESS, response);
export const projectPutError = (message: string) => action(ProjectAction.PUT_ERROR, message);
export const projectPutDispose = () => action(ProjectAction.PUT_DISPOSE);