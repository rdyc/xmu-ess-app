import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

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
  query?: IExtendedQuery;
}