import { IBaseChanges } from '@generic/interfaces';
import { IKPIAssignItem } from '..';
import { IKPIEmployee } from './IKPIEmployee';

export interface IKPIEmployeeItem {
  uid: string;
  kpiUid: string;
  kpi?: IKPIEmployee | null;
  kpiAssignItemUid: string;
  kpiAssignItem?: IKPIAssignItem | null;
  achieved: number;
  progress: number;
  score: number;
  changes: IBaseChanges | null;
}