import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IExpenseApprovalGetAllFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  start: string | undefined;
  end: string | undefined;
  status: string | undefined;
  isNotify: boolean | undefined;
  query?: IExtendedQuery | undefined;
}