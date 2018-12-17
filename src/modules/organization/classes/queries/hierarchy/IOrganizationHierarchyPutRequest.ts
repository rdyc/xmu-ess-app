import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationHierarchyPutPayload } from '@organization/classes/request/hierarchy';

export interface IOrganizationHierarchyPutRequest extends IBaseCommand<IOrganizationHierarchyPutPayload> {
  companyUid: string;
  hierarchyUid: string;
}