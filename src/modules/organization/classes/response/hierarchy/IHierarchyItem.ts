import { IAccountEmployeeAccess } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';

export interface IHierarchyItem {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  relationType?: string;
  relation?: ICommonSystem;
  level: number;
  access?: IAccountEmployeeAccess;
  changes?: IBaseChanges;
}