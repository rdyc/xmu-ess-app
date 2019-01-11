import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface ISettlement {
  uid: string;
  date?: string;
  projectUid?: string;
  project?: IProject;
  currencyType: string;
  currency?: ICommonSystem;
  rate: number;
  notes?: string;
  request?: number;
  actual?: number;
  difference?: number;
  requestInIDR?: number;
  actualInIDR?: number;
  differenceInIDR?: number;
  advance?: number;
  balanceDue?: number;
  reject?: string;
  statusType?: string;
  status?: ICommonSystem;
  customerUid: string;
  customer?: ILookupCustomer;
  changes?: IBaseChanges;
}