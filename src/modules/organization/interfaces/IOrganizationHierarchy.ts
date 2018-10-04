import { IOrganizationHierarchyItem } from '@organization/interfaces';

export interface IOrganizationHierarchy {
  uid:          string;
  name:         string;
  description:  string | null;
  inactiveDate: string | null;
  isExpired:    boolean;
  items?:       IOrganizationHierarchyItem[] | null;
}