import { IAccountEmployeeAccess } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { ILookupPosition } from '@lookup/classes';

export interface IHierarchyItemList {
  uid: string;
  positionUid: string;
  position?: ILookupPosition | null;
  relationType?: string | null;
  relation?: ICommonSystem | null;
  level: number;
  access?: IAccountEmployeeAccess | null;
}