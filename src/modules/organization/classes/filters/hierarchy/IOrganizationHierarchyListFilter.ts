import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationHierarchyListFilter extends IBasePagingFilter {
  companyUid: string | undefined;
  orderBy: string | undefined;
  direction: string | undefined;
}