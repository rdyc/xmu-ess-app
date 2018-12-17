import { IBasePayload } from '@generic/interfaces';
import { IOrganizationHierarchyPostItem } from './IOrganizationHierarchyPostItem';

export interface IOrganizationHierarchyPostPayload extends IBasePayload {
  name: string;
  description: string;
  inactiveDate: string;
  items: IOrganizationHierarchyPostItem[];
}