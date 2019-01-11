import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';

export interface IProjectAssignment {
  uid: string;
  projectUid: string;
  contractNumber?: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectType: string;
  project?: ICommonSystem;
  statusType: string;
  status?: ICommonSystem;
  name: string;
  description?: string;
  ownerEmployeeUid: string;
  owner?: IAccountEmployee;
  start: string;
  end: string;
  changes?: IBaseChanges;
}