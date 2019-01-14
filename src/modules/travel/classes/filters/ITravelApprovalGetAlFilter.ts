import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelApprovalgetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  projectUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete';
  isNotify?: boolean;
}