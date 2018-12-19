import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';

export interface IStructureItem {
  uid: string;
  positionUid: string;
  position?: ILookupPosition | null;
  employees: IAccountEmployee | null;
  start: string;
  end?: string | null;
  isActive: boolean;
  isExpired: boolean;
  changes?: IBaseChanges | null;
}