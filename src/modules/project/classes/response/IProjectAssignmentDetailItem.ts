import { IAccountEmployee, IAccountEmployeeRate } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

import { IProjectList } from './IProjectList';

export interface IProjectAssignmentDetailItem {
  uid: string;
  project: IProjectList;
  sequence: number;
  employeeUid: string;
  employee?: IAccountEmployee;
  rateUid: string;
  rate?: IAccountEmployeeRate;
  role?: string;
  jobDescription?: string;
  mandays: number;
  allocatedHours: number;
  consumedHours: number;
  statusType: string;
  status?: ICommonSystem;
  rejectedReason?: string;
  changes?: IBaseChanges;
}