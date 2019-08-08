import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPITemplateGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
}