import { IBaseQuery, IResponseCollection } from '@generic/interfaces';

export interface IBaseCollectionQuery<TRequest, TResponse> extends IBaseQuery {
  request?: TRequest;
  response?: IResponseCollection<TResponse>;
}