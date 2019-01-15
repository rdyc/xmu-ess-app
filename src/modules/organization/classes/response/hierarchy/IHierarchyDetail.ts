import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';
import { IHierarchyItem } from '@organization/classes/response/hierarchy';

export interface IHierarchyDetail {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  name: string;
  description?: string;
  inactiveDate?: string;
  isExpired: boolean;
  items?: IHierarchyItem[];
  changes?: IBaseChanges;
}