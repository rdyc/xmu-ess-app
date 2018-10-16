import { IBasePagingFilter } from '@generic/interfaces';

export interface IExpenseGetAllFilter extends IBasePagingFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  start: string | undefined;
  end: string | undefined;
  status: 'pending' | 'complete' | null;
  isRejected: boolean | null;
}