import { IBasePagingFilter } from '@generic/interfaces';

export interface IHRTemplateGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
}