import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

export interface IPurchaseGetAllFilter extends IBaseFilter, IBasePagingFilter {
  readonly customerUid: string | undefined;
  isRejected: boolean | undefined;
  isSettlement: boolean | undefined;
}