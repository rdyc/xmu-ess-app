import { IBasePagingFilter } from '@generic/interfaces';

export interface IFinanceGetAllFilter extends IBasePagingFilter {
  moduleType: string | undefined;
  employeeName: string | undefined;
  financeStatusTypes: string[] | undefined;
  settlementStatusTypes: string[] | undefined;
}