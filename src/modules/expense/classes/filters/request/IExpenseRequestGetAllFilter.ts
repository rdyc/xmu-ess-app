import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IExpenseRequestGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  expenseType?: string;
  start?: string;
  end?: string;
  statusType?: string;
  status?: string;
  isRejected?: boolean;
  query?: IExtendedQuery;
}