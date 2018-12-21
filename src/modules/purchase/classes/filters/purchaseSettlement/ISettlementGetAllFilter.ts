import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';
export interface ISettlementGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess {
  customerUid?: string;
  isRejected?: boolean;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
}