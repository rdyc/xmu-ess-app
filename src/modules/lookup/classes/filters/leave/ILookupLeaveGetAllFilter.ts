import { IBasePagingFilter } from '@generic/interfaces';

export interface ILookupLeaveGetAllFilter extends IBasePagingFilter {
  companyUid?: string; 
  year?: number;
}