import { IBaseQueryPagingFilter } from '@generic/interfaces';
// import { IBasePagingFilter } from '@generic/interfaces';

export interface IExpenseGetAllFilter extends IBaseQueryPagingFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  start: string | undefined;
  end: string | undefined;
  status: string | undefined;
  isRejected: boolean | undefined;
}