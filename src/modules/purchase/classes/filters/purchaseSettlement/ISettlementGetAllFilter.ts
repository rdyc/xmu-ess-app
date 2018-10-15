import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

export interface ISettlementGetAllFilter extends IBaseFilter, IBasePagingFilter {
  readonly customerUid: string | undefined;
}