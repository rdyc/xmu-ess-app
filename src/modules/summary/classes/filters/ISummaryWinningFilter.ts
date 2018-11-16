import { IBasePagingFilter } from '@generic/interfaces';

export interface ISummaryWinningFilter extends IBasePagingFilter {
  start?: string;
  end?: string;
}