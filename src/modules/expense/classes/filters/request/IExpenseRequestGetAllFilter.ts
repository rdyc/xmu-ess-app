import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IExpenseRequestGetAllFilter extends IBasePagingFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  start: string | undefined;
  end: string | undefined;
  status: string | undefined;
  isRejected: boolean | undefined;
  query?: IExtendedQuery | undefined;
}