import { IAccountEmployee, IAccountEmployeeRate } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

import { IProjectList } from './IProjectList';

export interface IProjectAssignmentDetailItem {
  readonly uid: string;
  readonly project: IProjectList;
  readonly sequence: number;
  readonly employeeUid: string;
  readonly employee: IAccountEmployee | null;
  readonly rateUid: string;
  readonly rate: IAccountEmployeeRate | null;
  readonly role: string | null;
  readonly jobDescription: string | null;
  readonly mandays: number;
  readonly allocatedHours: number;
  readonly consumedHours: number;
  readonly statusType: string;
  readonly status: ICommonSystem | null;
  readonly rejectedReason: string | null;
  readonly changes: IBaseChanges | null;
}