import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';

export interface IProjectAssignment {
  readonly uid: string;
  readonly projectUid: string;
  readonly contractNumber: string | null;
  readonly customerUid: string;
  readonly customer: ILookupCustomer | null;
  readonly projectType: string;
  readonly project: ICommonSystem | null;
  readonly statusType: string;
  readonly status: ICommonSystem | null;
  readonly name: string;
  readonly description: string | null;
  readonly ownerEmployeeUid: string;
  readonly owner: IAccountEmployee | null;
  readonly start: string | null;
  readonly end: string | null;
  readonly changes: IBaseChanges | null;
}