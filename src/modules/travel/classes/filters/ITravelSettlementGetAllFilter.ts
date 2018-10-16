import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelSettlementGetAllFilter extends IBasePagingFilter {
  readonly companyUid: string | null;
  readonly positionUid: string | null;
  readonly customerUid: string | null;
  readonly isRejected: boolean | null;
}