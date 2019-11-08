import { IBasePayload } from '@generic/interfaces';

export interface IOrganizationHierarchyDeletePayload extends IBasePayload {
  hierarchyUid: string;
  companyUid: string;
}