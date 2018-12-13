import { IOrganizationHierarchyAllFilter } from '@organization/classes/filters/hierarchy';

export interface IOrganizationHierarchyAllRequest {
  readonly filter?: IOrganizationHierarchyAllFilter | undefined;
}