import { IBaseQuery, IResponseCollection } from '@generic/interfaces';

export interface IBaseCollectionQuery<TReq, TRes> extends IBaseQuery {
  readonly request: TReq | undefined;
  readonly response: IResponseCollection<TRes> | undefined;
}