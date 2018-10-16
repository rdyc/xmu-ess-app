import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface IPurchase {
  uid: string;
  date: string;
  projectUid: string | null;
  project: IProject | null;
  currencyType: string;
  currency: ICommonSystem | null;
  rate: number | null;
  notes: string | null;
  request: number | null;
  requestIDR: number | null;
  advance: number | null;
  reason: string | null;
  statusType: string | null;
  status: ICommonSystem | null;
  customerUid: string;
  customer: ILookupCustomer | null;
  changes: IBaseChanges;
}