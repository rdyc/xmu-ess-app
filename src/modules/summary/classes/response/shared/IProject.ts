import { IAccountEmployee, IEmployeeAccessList } from '@account/classes';
import { ICommonSystem } from '@common/classes';
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
  ownerAccess: IEmployeeAccessList | null;
  name: string;
  description: string | null;
  maxHours: number;
  start: string | null;
  end: string | null;
}