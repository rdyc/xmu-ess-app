import { IBaseFilter } from '@generic/interfaces';

export interface IBasePagingFilter extends IBaseFilter {
  readonly page: number | undefined;
  readonly size: number | undefined;
}