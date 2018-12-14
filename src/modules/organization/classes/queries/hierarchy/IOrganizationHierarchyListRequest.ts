import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';

export interface IOrganizationHierarchyListRequest {
  readonly filter?: IOrganizationHierarchyListFilter | undefined;
}