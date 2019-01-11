import { IBasePagingFilter } from '@generic/interfaces';

export interface IPositionGetAllFilter extends IBasePagingFilter {
  companyUid?: string; 
}