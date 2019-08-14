import { IBaseChanges } from '@generic/interfaces';
import { IKPICategory } from '../category';
import { IKPIMeasurement } from '../measurement';
import { IEmployeeKPI } from './IEmployeeKPI';

export interface IEmployeeKPIItem {
  uid: string;
  kpiUid: string;
  kpi?: IEmployeeKPI | null;
  categoryUid: string;
  category?: IKPICategory | null;
  categoryName: string;
  measurementUid: string;
  measurement?: IKPIMeasurement | null;
  measurementName: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  achieved: number;
  progress: number;
  score: number;
  changes: IBaseChanges | null;
}