import { ILookupCompany } from '@lookup/classes';
import { IHierarchyItemList } from '@organization/classes/response/hierarchy';

export interface IHierarchyList {
  uid: string;
  companyUid: string;
  company?: ILookupCompany | null;
  name: string;
  description?: string | null;
  inactiveDate?: string | null;
  isExpired: boolean;
  items?: IHierarchyItemList[] | null;
}