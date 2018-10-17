import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface ISettlement {
  uid: string;
  date: string | null;
  projectUid: string | null;
  project: IProject | null;
  currencyType: string;
  currency: ICommonSystem | null;
  rate: number;
  notes: string | null;
  request: number | null;
  actual: number | null;
  difference: number | null;
  requestInIDR: number | null;
  actualInIDR: number | null;
  differenceInIDR: number | null;
  advance: number | null;
  balanceDue: number | null;
  reject: string | null;
  statusType: string | null;
  status: ICommonSystem | null;
  customerUid: string;
  customer: ILookupCustomer | null;
  changes: IBaseChanges | null;
}