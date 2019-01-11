import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { ILookupCustomer } from '@lookup/classes';

export interface IProjectList {
  uid: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectType: string;
  project?: ICommonSystem;
  contractNumber?: string;
  ownerEmployeeUid: string;
  owner?: IAccountEmployee;
  name: string;
  description?: string;
  maxHours: number;
  start: string;
  end: string;
  statusType: string;
  status?: ICommonSystem;
  rejectedReason?: string;
}