import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';

export interface IProject {
  uid: string;
  customerUid: string;
  customer: ILookupCustomer | null;
  projectType: string;
  project: ICommonSystem | null;
  contractNumber: string | null;
  ownerEmployeeUid: string | null;
  owner: IAccountEmployee | null;
  name: string;
  description: string | null;
  maxHours: number;
  start: string;
  end: string;
  valueIdr?: number | null;
  statusType: string;
  status: ICommonSystem | null;
  rejectedReason: string | null;
  changes: IBaseChanges | null;
}