import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelSettlementGetAllFilter extends IBasePagingFilter {
  // readonly companyUid: string | undefined;
  // readonly positionUid: string | undefined;
  // readonly customerUid: string | undefined;
  // readonly isRejected: boolean | undefined;
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  statusType?: string;
  isRejected?: boolean;
}