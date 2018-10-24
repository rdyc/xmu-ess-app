export interface IBaseQueryFilter {
  readonly 'query.find'?: string | undefined;
  readonly 'query.findBy'?: string | undefined;
  readonly 'query.orderBy'?: string | undefined;
  readonly 'query.direction'?: string | undefined;
}