import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationStructureSubOrdinateTreeKPIFinalFilter extends IBasePagingFilter {
  isNotFinal?: boolean;
  year?: number;
  period?: number;
  isActive?: boolean;
}