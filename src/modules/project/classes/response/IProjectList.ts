import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { ILookupCustomer } from '@lookup/classes';

export interface IProjectList {
  uid: string;
  customerUid: string;
  customer: ILookupCustomer | null;
  projectType: string;
  project: ICommonSystem | null;
  contractNumber: string | null;
  ownerEmployeeUid: string;
  owner: IAccountEmployee | null;
  name: string;
  description: string | null;
  maxHours: number;
  start: string;
  end: string;
  statusType: string;
  status: ICommonSystem | null;
  rejectedReason: string | null;
}