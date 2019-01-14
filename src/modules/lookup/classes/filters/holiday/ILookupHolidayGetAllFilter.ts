import { IBasePagingFilter } from '@generic/interfaces';

export interface ILookupHolidayGetAllFilter extends IBasePagingFilter {
  companyUid?: string; 
}