import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum SiteAction {
  GET_ALL_REQUEST = '@@system/site/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/site/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/site/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/site/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/site/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/site/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/site/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/site/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/site/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/site/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/site/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/site/GET_BY_ID_DISPOSE',
}

// get all
export const siteGetAllRequest = (request: ISystemAllRequest) => action(SiteAction.GET_ALL_REQUEST, request);
export const siteGetAllSuccess = (response: IResponseCollection<ISystem>) => action(SiteAction.GET_ALL_SUCCESS, response);
export const siteGetAllError = (error: any) => action(SiteAction.GET_ALL_ERROR, error);
export const siteGetAllDispose = () => action(SiteAction.GET_ALL_DISPOSE);

// get list
export const siteGetListRequest = (request: ISystemListRequest) => action(SiteAction.GET_LIST_REQUEST, request);
export const siteGetListSuccess = (response: IResponseCollection<ISystemList>) => action(SiteAction.GET_LIST_SUCCESS, response);
export const siteGetListError = (error: any) => action(SiteAction.GET_LIST_ERROR, error);
export const siteGetListDispose = () => action(SiteAction.GET_LIST_DISPOSE);

// get by id
export const siteGetByIdRequest = (request: ISystemByIdRequest) => action(SiteAction.GET_BY_ID_REQUEST, request);
export const siteGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(SiteAction.GET_BY_ID_SUCCESS, response);
export const siteGetByIdError = (error: any) => action(SiteAction.GET_BY_ID_ERROR, error);
export const siteGetByIdDispose = () => action(SiteAction.GET_BY_ID_DISPOSE);