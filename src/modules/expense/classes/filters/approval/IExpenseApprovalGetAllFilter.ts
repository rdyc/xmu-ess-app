import { IBasePagingFilter } from '@generic/interfaces';

export interface IExpenseApprovalGetAllFilter extends IBasePagingFilter  {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  projectUid?: string;
  expenseType?: string;
  start?: string;
  end?: string;
  statusType?: string;
  status?: string;
  isNotify?: boolean;
}