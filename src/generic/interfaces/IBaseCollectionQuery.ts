import { IBaseQuery, IResponseCollection } from '@generic/interfaces';

export interface IBaseCollectionQuery<F, R> extends IBaseQuery {
  readonly filter: F | undefined;
  readonly response: IResponseCollection<R> | undefined;
}