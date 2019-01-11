import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageExceptionAllFilter extends IBasePagingFilter {
  companyUid?: string;
  roleUid?: string;
}
