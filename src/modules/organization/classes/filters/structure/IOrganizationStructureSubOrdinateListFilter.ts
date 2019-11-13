import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationStructureSubOrdinateListFilter extends IBasePagingFilter {
  companyUid: string;
  positionUid: string;
}