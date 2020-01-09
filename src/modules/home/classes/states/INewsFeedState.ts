import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { INewsFeedGetListRequest, INewsFeedGetRequest } from '../queries/newsFeed';
import { INews, INewsFeed } from '../response/newsFeed';

export interface INewsFeedState {
  newsFeedGet: IQuerySingleState<INewsFeedGetRequest, INewsFeed>;
  newsFeedGetList: IQueryCollectionState<INewsFeedGetListRequest, INews>;
}