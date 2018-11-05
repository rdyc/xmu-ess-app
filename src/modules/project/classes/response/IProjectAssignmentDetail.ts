import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';

import { IProjectAssignmentDetailItem } from './IProjectAssignmentDetailItem';

export interface IProjectAssignmentDetail {
  readonly uid: string;
  readonly projectUid: string;
  readonly customerUid: string;
  readonly customer: ILookupCustomer | null;
  readonly projectType: string;
  readonly project: ICommonSystem | null;
  readonly statusType: string;
  readonly contractNumber: string | null;
  readonly status: ICommonSystem | null;
  readonly name: string;
  readonly description: string | null;
  readonly ownerEmployeeUid: string;
  readonly owner: IAccountEmployee | null;
  readonly start: string;
  readonly end: string;
  readonly maxHours: number;
  readonly assignedHours: number;
  readonly unassignedHours: number;
  readonly items: IProjectAssignmentDetailItem[] | null;
  readonly changes: IBaseChanges | null;
}