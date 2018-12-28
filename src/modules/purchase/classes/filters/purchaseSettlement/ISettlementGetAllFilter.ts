import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface ISettlementGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess {
  customerUid?: string;
  projectUid?: string; 
  isRejected?: boolean;
  statusType?: string;
}