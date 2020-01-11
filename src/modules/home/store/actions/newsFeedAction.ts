import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { INewsFeedGetListRequest, INewsFeedGetRequest } from '@home/classes/queries/newsFeed';
import { INews, INewsFeed } from '@home/classes/response/newsFeed';
import { action } from 'typesafe-actions';

export const enum NewsFeedAction {
  GET_REQUEST = '@@newsFeed/GET_REQUEST',
  GET_SUCCESS = '@@newsFeed/GET_SUCCESS',
  GET_ERROR = '@@newsFeed/GET_ERROR',
  GET_DISPOSE = '@@newsFeed/GET_DISPOSE',
  GET_LIST_REQUEST = '@@newsFeed/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@newsFeed/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@newsFeed/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@newsFeed/GET_LIST_DISPOSE',
}

export const newsFeedGetRequest = (request: INewsFeedGetRequest) => action(NewsFeedAction.GET_REQUEST, request);
export const newsFeedGetSuccess = (response: IResponseSingle<INewsFeed>) => action(NewsFeedAction.GET_SUCCESS, response);
export const newsFeedGetError = (message: string) => action(NewsFeedAction.GET_ERROR, message);
export const newsFeedGetDispose = () => action(NewsFeedAction.GET_DISPOSE);

export const newsFeedGetListRequest = (request: INewsFeedGetListRequest) => action(NewsFeedAction.GET_LIST_REQUEST, request);
export const newsFeedGetListSuccess = (response: IResponseCollection<INews>) => action(NewsFeedAction.GET_LIST_SUCCESS, response);
export const newsFeedGetListError = (error: any) => action(NewsFeedAction.GET_LIST_ERROR, error);
export const newsFeedGetListDispose = () => action(NewsFeedAction.GET_LIST_DISPOSE);