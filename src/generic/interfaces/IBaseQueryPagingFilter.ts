import { IBaseQueryFilter } from '@generic/interfaces';

export interface IBaseQueryPagingFilter extends IBaseQueryFilter {
  readonly 'query.page'?: number | undefined;
  readonly 'query.size'?: number | undefined;
}