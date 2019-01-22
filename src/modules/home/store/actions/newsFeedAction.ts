import { IResponseSingle } from '@generic/interfaces';
import { INewsFeedGetRequest } from '@home/classes/queries/newsFeed';
import { INewsFeed } from '@home/classes/response/newsFeed';
import { action } from 'typesafe-actions';

export const enum NewsFeedAction {
  GET_REQUEST = '@@newsFeed/GET_REQUEST',
  GET_SUCCESS = '@@newsFeed/GET_SUCCESS',
  GET_ERROR = '@@newsFeed/GET_ERROR',
  GET_DISPOSE = '@@newsFeed/GET_DISPOSE',
}

export const newsFeedGetRequest = (request: INewsFeedGetRequest) => action(NewsFeedAction.GET_REQUEST, request);
export const newsFeedGetSuccess = (response: IResponseSingle<INewsFeed>) => action(NewsFeedAction.GET_SUCCESS, response);
export const newsFeedGetError = (message: string) => action(NewsFeedAction.GET_ERROR, message);
export const newsFeedGetDispose = () => action(NewsFeedAction.GET_DISPOSE);