import { IBasePayload } from '@generic/interfaces';

export interface IOrganizationWorkflowDeleteHierarchy extends IBasePayload {
  uid: string;
  companyUid: string;
  menuUid: string;
}