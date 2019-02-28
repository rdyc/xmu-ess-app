import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface ISettlementGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess {
  customerUid?: string;
  projectUid?: string; 
  isRejected?: boolean;
  status?: 'pending' | 'complete' | string;
  statusType?: string;
}