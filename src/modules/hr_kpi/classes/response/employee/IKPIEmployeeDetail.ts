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
  isFirst: boolean;
  revision?: string;
  statusType: string;
  status?: ICommonSystem;
  notes?: string;
  items?: IKPIEmployeeItem[] | null;
  changes: IBaseChanges | null;
}