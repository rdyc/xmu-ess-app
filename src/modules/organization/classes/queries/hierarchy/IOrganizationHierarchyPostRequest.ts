import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationHierarchyPostPayload } from '@organization/classes/request/hierarchy';

export interface IOrganizationHierarchyPostRequest extends IBaseCommand<IOrganizationHierarchyPostPayload> {
  companyUid: string;
}