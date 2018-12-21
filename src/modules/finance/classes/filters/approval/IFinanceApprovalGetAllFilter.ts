import { IBasePagingFilter } from '@generic/interfaces';

export interface IFinanceApprovalGetAllFilter extends IBasePagingFilter {
  moduleType?: string;
  employeeName?: string;
  start?: string;
  end?: string;
  financeStatusTypes?: string[];
  settlementStatusTypes?: string[];
}