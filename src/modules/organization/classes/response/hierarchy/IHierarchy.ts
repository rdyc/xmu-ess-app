import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';
import { IHierarchyItem } from '@organization/classes/response/hierarchy';

export interface IHierarchy {
  uid: string;
  companyUid: string;
  company?: ILookupCompany | null;
  name: string;
  description?: string | null;
  inactiveDate?: string | null;
  isExpired: boolean;
  items?: IHierarchyItem[] | null;
  changes?: IBaseChanges | null;
}