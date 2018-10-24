import { IResponseCollection } from '@generic/interfaces';
import {
  IProjectSiteDeleteRequest,
  IProjectSiteGetRequest,
  IProjectSitePostRequest,
  IProjectSitePutRequest,
} from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectSiteAction {
  GET_REQUEST = '@@project/site/GET_REQUEST',
  GET_SUCCESS = '@@project/site/GET_SUCCESS',
  GET_ERROR = '@@project/site/GET_ERROR',
  GET_DISPOSE = '@@project/site/GET_DISPOSE',
  POST_REQUEST = '@@project/site/POST_REQUEST',
  POST_SUCCESS = '@@project/site/POST_SUCCESS',
  POST_ERROR = '@@project/site/POST_ERROR',
  POST_DISPOSE = '@@project/site/POST_DISPOSE',
  PUT_REQUEST = '@@project/site/PUT_REQUEST',
  PUT_SUCCESS = '@@project/site/PUT_SUCCESS',
  PUT_ERROR = '@@project/site/PUT_ERROR',
  PUT_DISPOSE = '@@project/site/PUT_DISPOSE',
  DELETE_REQUEST = '@@project/site/DELETE_REQUEST',
  DELETE_SUCCESS = '@@project/site/DELETE_SUCCESS',
  DELETE_ERROR = '@@project/site/DELETE_ERROR',
  DELETE_DISPOSE = '@@project/site/DELETE_DISPOSE',
}

// get
export const projectSiteGetRequest = (request: IProjectSiteGetRequest) => action(ProjectSiteAction.GET_REQUEST, request);
export const projectSiteGetSuccess = (response: IResponseCollection<IProjectSite>) => action(ProjectSiteAction.GET_SUCCESS, response);
export const projectSiteGetError = (message: string) => action(ProjectSiteAction.GET_ERROR, message);
export const projectSiteGetDispose = () => action(ProjectSiteAction.GET_DISPOSE);

// post
export const projectSitePostRequest = (request: IProjectSitePostRequest) => action(ProjectSiteAction.POST_REQUEST, request);
export const projectSitePostSuccess = (response: boolean) => action(ProjectSiteAction.POST_SUCCESS, response);
export const projectSitePostError = (message: string) => action(ProjectSiteAction.POST_ERROR, message);
export const projectSitePostDispose = () => action(ProjectSiteAction.POST_DISPOSE);

// put
export const projectSitePutRequest = (request: IProjectSitePutRequest) => action(ProjectSiteAction.PUT_REQUEST, request);
export const projectSitePutSuccess = (response: boolean) => action(ProjectSiteAction.PUT_SUCCESS, response);
export const projectSitePutError = (message: string) => action(ProjectSiteAction.PUT_ERROR, message);
export const projectSitePutDispose = () => action(ProjectSiteAction.PUT_DISPOSE);

// delete
export const projectSiteDeleteRequest = (request: IProjectSiteDeleteRequest) => action(ProjectSiteAction.DELETE_REQUEST, request);
export const projectSiteDeleteSuccess = (response: boolean) => action(ProjectSiteAction.DELETE_SUCCESS, response);
export const projectSiteDeleteError = (message: string) => action(ProjectSiteAction.DELETE_ERROR, message);
export const projectSiteDeleteDispose = () => action(ProjectSiteAction.DELETE_DISPOSE);