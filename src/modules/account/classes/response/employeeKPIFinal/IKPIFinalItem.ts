import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IKPIFinalItem {
  uid: string;
  kpiUid: string;
  categoryName: string;
  group: 'kpi' | 'personal';
  measurementDescription: string;
  measurementType: string;
  measurement?: ICommonSystem;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  achieved: number;
  progress: number;
  score: number;
  changes?: IBaseChanges;
}