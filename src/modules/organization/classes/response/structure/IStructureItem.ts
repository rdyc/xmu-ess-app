import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';

export interface IStructureItem {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  employees?: IAccountEmployee;
  start: string;
  end?: string;
  isActive: boolean;
  isExpired: boolean;
  changes?: IBaseChanges;
}