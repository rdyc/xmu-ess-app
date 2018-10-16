import { IBasePagingFilter } from '@generic/interfaces';

export interface IExpenseApprovalGetAllFilter extends IBasePagingFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  start: string | undefined;
  end: string | undefined;
  status: 'pending' | 'complete' | null;
  isNotify: boolean | null;
}