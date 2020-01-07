import { IOrganizationStructureSubOrdinateTreeKPIFinalFilter } from '@organization/classes/filters/structure';

export interface IOrganizationStructureSubOrdinateTreeKPIFinalRequest {
  filter?: IOrganizationStructureSubOrdinateTreeKPIFinalFilter;
  companyUid: string;
  positionUid: string;
}