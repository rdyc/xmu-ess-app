import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IKPIAssign } from '..';
import { IKPIEmployeeItem } from './IKPIEmployeeItem';

export interface IKPIEmployeeDetail {
  uid: string;
  kpiAssignUid: string;
  kpiAssign?: IKPIAssign | null;
  period: number;
  totalScore: number;
  isFinal: boolean;
  revision?: string;
  statusType?: string;
  status?: ICommonSystem;
  items?: IKPIEmployeeItem[] | null;
  // sentBy?: string | null;
  // sent?: IEmployee | null;
  // sentAt?: string | null;
  changes: IBaseChanges | null;
}