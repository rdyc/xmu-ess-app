import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';

export interface IProject {
  uid: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectType: string;
  project?: ICommonSystem;
  contractNumber?: string;
  ownerEmployeeUid?: string;
  owner?: IAccountEmployee;
  childProjectUid?: string;
  name: string;
  description?: string;
  maxHours: number;
  start: string;
  end: string;
  valueIdr?: number;
  statusType: string;
  status?: ICommonSystem;
  rejectedReason?: string;
  changes?: IBaseChanges;
}