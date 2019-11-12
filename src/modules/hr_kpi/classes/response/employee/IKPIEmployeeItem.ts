import { IBaseChanges } from '@generic/interfaces';
import { IKPIAssignItem, IKPICategory, IKPIMeasurement } from '..';
import { IKPIEmployee } from './IKPIEmployee';

export interface IKPIEmployeeItem {
  uid: string;
  kpiUid: string;
  kpi?: IKPIEmployee | null;
  kpiAssignItemUid: string;
  kpiAssignItem?: IKPIAssignItem | null;
  categoryUid: string;
  category?: IKPICategory | null;
  categoryName: string;
  measurementUid: string;
  measurement?: IKPIMeasurement | null;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  achieved: number;
  progress: number;
  score: number;
  changes: IBaseChanges | null;
}