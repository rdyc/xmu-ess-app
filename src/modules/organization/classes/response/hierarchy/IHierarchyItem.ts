import { IAccountEmployeeAccess } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';

export interface IHierarchyItem {
  uid: string;
  positionUid: string;
  position?: ILookupPosition | null;
  relationType?: string | null;
  relation?: ICommonSystem | null;
  level: number;
  access?: IAccountEmployeeAccess | null;
  changes?: IBaseChanges | null;
}