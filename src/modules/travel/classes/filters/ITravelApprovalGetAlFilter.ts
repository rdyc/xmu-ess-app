import { IBasePagingFilter } from '@generic/interfaces';

export interface ITravelApprovalgetAllFilter extends IBasePagingFilter {
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  customerUid?: string | undefined;
  projectUid?: string | undefined;
  statusType?: string | undefined;
  status?: 'pending' | 'complete' | undefined;
  isNotify?: boolean | undefined;
}