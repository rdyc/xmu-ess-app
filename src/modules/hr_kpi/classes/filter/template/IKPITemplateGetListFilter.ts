import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPITemplateGetListFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
}