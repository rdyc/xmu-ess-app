import { IAccountEmployee } from '@account/interfaces';
import { ILookupPosition } from '@lookup/interfaces';
import { ICommonSystem } from '@common/interfaces';

export interface IOrganizationHierarchyItem {
  uid:          string;
  positionUid:  string;
  position:     ILookupPosition | null;
  relationType: string | null;
  relation:     ICommonSystem | null;
  level:        number;
  employees:    IAccountEmployee[] | null;
}