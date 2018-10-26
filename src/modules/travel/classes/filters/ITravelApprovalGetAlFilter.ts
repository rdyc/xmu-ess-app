import { IBaseQueryPagingFilter } from '@generic/interfaces';

export interface ITravelApprovalgetAllFilter extends IBaseQueryPagingFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  status: 'pending' | 'complete' | undefined;
  isNotify: boolean | undefined;
}