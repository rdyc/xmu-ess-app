import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelSettlementGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  projectUid?: string;
  positionUid?: string;
  customerUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | undefined;
  start?: string;
  end?: string;
  isRejected?: boolean;
}