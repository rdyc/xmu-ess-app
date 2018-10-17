// import { IExpenseQueryFilter } from './IExpenseQueryFilter';

import { IBasePagingFilter } from '@generic/interfaces';

export interface IExpenseGetAllFilter extends IBasePagingFilter {
  // query: IExpenseQueryFilter | undefined;
  companyUid: string | undefined;
  positionUid: string | undefined;
  start: string | undefined;
  end: string | undefined;
  status: string | undefined;
  isRejected: boolean | undefined;
}