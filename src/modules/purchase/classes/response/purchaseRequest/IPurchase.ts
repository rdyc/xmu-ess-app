import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface IPurchase {
  uid: string;
  date: string;
  projectUid?: string;
  project?: IProject;
  currencyType: string;
  currency?: ICommonSystem;
  rate?: number;
  notes?: string;
  request?: number;
  requestIDR?: number;
  advance?: number;
  reason?: string;
  statusType?: string;
  status?: ICommonSystem;
  customerUid: string;
  customer?: ILookupCustomer;
  changes?: IBaseChanges;
}