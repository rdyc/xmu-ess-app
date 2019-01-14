import { IAccountEmployeeAccess } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { ILookupPosition } from '@lookup/classes';

export interface IHierarchyItemList {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  relationType?: string;
  relation?: ICommonSystem;
  level: number;
  access?: IAccountEmployeeAccess;
}