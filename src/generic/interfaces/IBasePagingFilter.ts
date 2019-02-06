import { IBaseFilter } from '@generic/interfaces';

export interface IBasePagingFilter extends IBaseFilter {
  page?: number;
  size?: number;
}