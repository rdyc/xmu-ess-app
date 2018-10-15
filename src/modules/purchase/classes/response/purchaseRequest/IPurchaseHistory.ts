import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';

export interface IPurchaseHistory {
  uid: string;
  purchaseUid: string;
  level: number;
  statusType: string;
  status: ICommonSystem | null;
  positionUid: string;
  position: ILookupPosition | null;
  employees: IAccountEmployee[] | null;
  changes: IBaseChanges | null;
}