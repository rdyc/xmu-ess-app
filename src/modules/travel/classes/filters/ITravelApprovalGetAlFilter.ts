import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelApprovalgetAllFilter extends IBasePagingFilter {
  companyUid: string | null;
  positionUid: string | null;
  status: 'pending' | 'complete' | null;
  isNotify: boolean | null;
}