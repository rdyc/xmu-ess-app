import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationStructureAllFilter extends IBasePagingFilter {
  companyUid?: string;
}