import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelRequestGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  projectUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | undefined;
  start?: string;
  end?: string;
  isRejected?: boolean;
  isSettlement?: boolean;
}