import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationHierarchyListFilter extends IBasePagingFilter {
  companyUid?: string;
}