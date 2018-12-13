import { IBasePayload } from '@generic/interfaces';

export interface IOrganizationHierarchyDeletePayload extends IBasePayload {
  uid: string;
  companyUid: string;
}