import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelRequestGetAllFilter extends IBasePagingFilter {
  readonly companyUid: string | null;
  readonly positionUid: string | null;
  readonly customerUid: string | null;
  readonly isRejected: boolean | null;
  readonly  isSettlement: boolean | null;
}