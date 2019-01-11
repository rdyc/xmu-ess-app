import { ILookupCompany } from '@lookup/classes';
import { IHierarchyItemList } from '@organization/classes/response/hierarchy';

export interface IHierarchyList {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  name: string;
  description?: string;
  inactiveDate?: string;
  isExpired: boolean;
  items?: IHierarchyItemList[];
}