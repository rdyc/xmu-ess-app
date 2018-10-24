import { IBaseQueryPagingFilter } from '@generic/interfaces';

export interface ILeaveApprovalGetAllFilter extends IBaseQueryPagingFilter {
  status: 'pending' | 'complete' | undefined;
  isNotify: boolean | undefined;
}