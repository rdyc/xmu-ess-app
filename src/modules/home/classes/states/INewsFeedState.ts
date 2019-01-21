import { IQuerySingleState } from '@generic/interfaces';
import { INewsFeedGetRequest } from '../queries/newsFeed';
import { INewsFeed } from '../response/newsFeed';

export interface INewsFeedState {
  newsFeedGet: IQuerySingleState<INewsFeedGetRequest, INewsFeed>;
}