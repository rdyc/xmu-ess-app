import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelRequestGetAllFilter extends IBasePagingFilter {
  readonly companyUid: string | undefined;
  readonly positionUid: string | undefined;
  readonly customerUid: string | undefined;
  readonly isRejected: boolean | undefined;
  readonly isSettlement: boolean | undefined;
}