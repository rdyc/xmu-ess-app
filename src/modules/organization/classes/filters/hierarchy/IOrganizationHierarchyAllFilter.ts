import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationHierarchyAllFilter extends IBasePagingFilter {
  companyUid: string | undefined;
}