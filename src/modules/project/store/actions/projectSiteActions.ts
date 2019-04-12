import { IResponseCollection } from '@generic/interfaces';
import { IProjectSiteGetRequest, IProjectSitePatchRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectSiteAction {
  GET_REQUEST = '@@project/site/GET_REQUEST',
  GET_SUCCESS = '@@project/site/GET_SUCCESS',
  GET_ERROR = '@@project/site/GET_ERROR',
  GET_DISPOSE = '@@project/site/GET_DISPOSE',
  PATCH_REQUEST = '@@project/site/PATCH_REQUEST',
  PATCH_SUCCESS = '@@project/site/PATCH_SUCCESS',
  PATCH_ERROR = '@@project/site/PATCH_ERROR',
  PATCH_DISPOSE = '@@project/site/PATCH_DISPOSE'
}

// get
export const projectSiteGetRequest = (request: IProjectSiteGetRequest) => action(ProjectSiteAction.GET_REQUEST, request);
export const projectSiteGetSuccess = (response: IResponseCollection<IProjectSite>) => action(ProjectSiteAction.GET_SUCCESS, response);
export const projectSiteGetError = (error: any) => action(ProjectSiteAction.GET_ERROR, error);
export const projectSiteGetDispose = () => action(ProjectSiteAction.GET_DISPOSE);

// patch
export const projectSitePatchRequest = (request: IProjectSitePatchRequest) => action(ProjectSiteAction.PATCH_REQUEST, request);
export const projectSitePatchSuccess = (response: boolean) => action(ProjectSiteAction.PATCH_SUCCESS, response);
export const projectSitePatchError = (error: any) => action(ProjectSiteAction.PATCH_ERROR, error);
export const projectSitePatchDispose = () => action(ProjectSiteAction.PATCH_DISPOSE);