import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter { }

export interface ISettlementGetAllFilter extends ICompanyAccess {
  customerUid?: string;
  isRejected?: boolean;
  statusType?: string;
  query?: IExtendedQuery;
}