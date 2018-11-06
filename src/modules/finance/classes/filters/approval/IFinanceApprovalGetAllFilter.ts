import { IBasePagingFilter } from '@generic/interfaces';

export interface IFinanceApprovalGetAllFilter extends IBasePagingFilter {
  moduleType: string | undefined;
  employeeName: string | undefined;
  financeStatusTypes: string[] | undefined;
  settlementStatusTypes: string[] | undefined;
}