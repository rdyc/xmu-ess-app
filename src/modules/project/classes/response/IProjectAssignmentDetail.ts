import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';

import { IProjectAssignmentDetailItem } from './IProjectAssignmentDetailItem';

export interface IProjectAssignmentDetail {
  uid: string;
  projectUid: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectType: string;
  project?: ICommonSystem;
  statusType: string;
  contractNumber?: string;
  status?: ICommonSystem;
  name: string;
  description?: string;
  ownerEmployeeUid: string;
  owner?: IAccountEmployee;
  start: string;
  end: string;
  maxHours: number;
  assignedHours: number;
  unassignedHours: number;
  items?: IProjectAssignmentDetailItem[];
  changes?: IBaseChanges;
}