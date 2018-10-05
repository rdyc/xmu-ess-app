import { IBasePagingFilter } from '@generic/interfaces';

export interface IMenuAllFilter extends IBasePagingFilter {
  readonly menuUid: string | undefined;
}